const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
        maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },
    image: {
        type: String,
        default: 'default-blog.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    },
    category: {
        type: String,
        default: 'Music'
    },
    tags: [String],
    published: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, {
    timestamps: true
});

// Create slug from title before saving
blogSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
