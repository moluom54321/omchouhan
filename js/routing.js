// Frontend Role-Based Routing System
class RoleBasedRouter {
    constructor() {
        this.API_BASE_URL = 'http://localhost:5000/api';
        this.protectedRoutes = {
            'admin': [
                'admin-dashboard.html',
                'admin-students.html',

                'admin-payments.html',
                'admin-attendance.html',
                'admin-guitar-tabs.html',
                'admin/*'  // All admin-related pages
            ],
            'student': [
                'student-dashboard.html', 
                'student/*', // All student-related pages
                'attendance-calendar.html' // Attendance calendar is accessible to students
            ]
        };
    }

    // JWT Token Helper Functions
    getAuthToken() {
        return localStorage.getItem('token');
    }

    removeAuthToken() {
        localStorage.removeItem('token');
    }

    decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getAuthToken();
        return !!token;
    }

    // Get user role
    getUserRole() {
        const token = this.getAuthToken();
        if (!token) return null;

        const decodedToken = this.decodeToken(token);
        return decodedToken ? decodedToken.role : null;
    }

    // Check if route is accessible by user role
    isRouteAccessible(route, userRole) {
        if (!userRole) return false;

        // Check if route is protected
        for (const [role, routes] of Object.entries(this.protectedRoutes)) {
            if (userRole === role) {
                for (const protectedRoute of routes) {
                    if (protectedRoute.endsWith('/*')) {
                        const basePath = protectedRoute.slice(0, -2); // Remove '/*'
                        if (route.startsWith(basePath)) {
                            return true;
                        }
                    } else if (route === protectedRoute) {
                        return true;
                    }
                }
            }
        }

        // Public routes (not in protected list) are accessible to all
        return !this.isProtectedRoute(route);
    }

    // Check if route is protected
    isProtectedRoute(route) {
        for (const routes of Object.values(this.protectedRoutes)) {
            for (const protectedRoute of routes) {
                if (protectedRoute.endsWith('/*')) {
                    const basePath = protectedRoute.slice(0, -2);
                    if (route.startsWith(basePath)) {
                        return true;
                    }
                } else if (route === protectedRoute) {
                    return true;
                }
            }
        }
        return false;
    }

    // Redirect user based on role and requested route
    checkRouteAccess() {
        const currentPath = window.location.pathname.split('/').pop();
        const isAuthenticated = this.isAuthenticated();
        const userRole = this.getUserRole();

        // If trying to access protected route without authentication
        if (this.isProtectedRoute(currentPath) && !isAuthenticated) {
            this.redirectToLogin();
            return false;
        }

        // If authenticated but trying to access route not allowed for user role
        if (isAuthenticated && userRole && !this.isRouteAccessible(currentPath, userRole)) {
            this.handleUnauthorizedAccess(userRole);
            return false;
        }

        // If user is authenticated and trying to access login page, redirect to dashboard
        if (isAuthenticated && currentPath === 'login.html') {
            this.redirectBasedOnRole();
            return false;
        }

        return true;
    }

    // Redirect to login page
    redirectToLogin() {
        window.location.href = 'login.html';
    }

    // Redirect user based on their role
    redirectBasedOnRole() {
        const userRole = this.getUserRole();
        if (userRole === 'admin' || userRole === 'super_admin') {
            window.location.href = 'admin-dashboard.html';
        } else if (userRole === 'student') {
            window.location.href = 'student-dashboard.html';
        } else {
            this.redirectToLogin();
        }
    }

    // Handle unauthorized access
    handleUnauthorizedAccess(userRole) {
        if (userRole === 'admin' || userRole === 'super_admin') {
            window.location.href = 'admin-dashboard.html';
        } else if (userRole === 'student') {
            window.location.href = 'student-dashboard.html';
        } else {
            this.redirectToLogin();
        }
    }

    // API Call Helper
    async apiCall(url, options = {}) {
        const token = this.getAuthToken();

        const config = {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API call failed');
            }

            return data;
        } catch (error) {
            if (error.message.includes('Unauthorized')) {
                this.removeAuthToken();
                this.redirectToLogin();
            }
            throw error;
        }
    }

    // Initialize route protection
    init() {
        // Check route access on page load
        if (!this.checkRouteAccess()) {
            return false;
        }

        // Set up navigation guards for single page applications
        this.setupNavigationGuards();

        return true;
    }

    // Set up navigation guards (for SPA navigation)
    setupNavigationGuards() {
        // For modern SPAs, you would intercept navigation events
        // This is a simplified version for multi-page application
        const self = this;

        // Override navigation functions if needed
        // For now, we rely on the checkRouteAccess on each page load
    }

    // Navigation helper for authorized routes
    navigateTo(route) {
        const userRole = this.getUserRole();
        
        if (this.isRouteAccessible(route, userRole)) {
            window.location.href = route;
        } else {
            this.handleUnauthorizedAccess(userRole);
        }
    }
}

// Initialize the router
const router = new RoleBasedRouter();

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    router.init();
});

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoleBasedRouter;
}