const Blog = require('../models/Blog');
const path = require('path');
const fs = require('fs');

/**
 * @desc    Create a new blog post
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
const createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, author, category, tags, published } = req.body;
        
        let imageUrl = 'default-blog.jpg';
        if (req.file) {
            imageUrl = `/uploads/blogs/${req.file.filename}`;
        }

        const blog = new Blog({
            title,
            content,
            excerpt,
            author,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            published: published === 'false' ? false : true,
            image: imageUrl,
            createdBy: req.user.userId
        });

        await blog.save();

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

/**
 * @desc    Get all blog posts
 * @route   GET /api/blogs
 * @access  Public
 */
const getAllBlogs = async (req, res) => {
    try {
        const { category, published } = req.query;
        let query = {};
        
        if (category) query.category = category;
        if (published !== undefined) query.published = published === 'true';
        else query.published = true; // Default to showing only published blogs for public

        // If admin is requesting, they might want to see unpublished ones too
        if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
            if (published === 'all') delete query.published;
            else if (published !== undefined) query.published = published === 'true';
        }

        // Fetch all blogs matching the query
        const blogs = await Blog.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('Get all blogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

/**
 * @desc    Get single blog post by ID or Slug
 * @route   GET /api/blogs/:idOrSlug
 * @access  Public
 */
const getBlogByIdOrSlug = async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        
        // Try finding by ID first, then by slug
        let blog;
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            blog = await Blog.findById(idOrSlug).populate('createdBy', 'name email');
        } else {
            blog = await Blog.findOne({ slug: idOrSlug }).populate('createdBy', 'name email');
        }

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Increment views
        blog.views += 1;
        await blog.save();

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

/**
 * @desc    Update a blog post
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, author, category, tags, published } = req.body;

        let blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Prepare update data
        const updateData = {
            title,
            content,
            excerpt,
            author,
            category,
            tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : blog.tags,
            published: published !== undefined ? (published === 'false' ? false : true) : blog.published,
            updatedAt: Date.now()
        };

        // Handle image update
        if (req.file) {
            // Delete old image if it's not the default one
            if (blog.image && blog.image !== 'default-blog.jpg') {
                const oldImagePath = path.join(__dirname, '../../../public', blog.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/blogs/${req.file.filename}`;
        }

        blog = await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            message: 'Blog post updated successfully',
            data: blog
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Delete image if it's not the default one
        if (blog.image && blog.image !== 'default-blog.jpg') {
            const imagePath = path.join(__dirname, '../../../public', blog.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Blog.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogByIdOrSlug,
    updateBlog,
    deleteBlog
};
