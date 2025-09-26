// Utility helper functions
const Utils = {
  generateId: () => "_" + Math.random().toString(36).substr(2, 9),

  formatDate: (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  timeAgo: (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return "Just now";
  },

  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  formatCurrency: (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount),

  getStatusBadge: (status) => {
    const S = window.Constants.COMPLAINT_STATUS;
    const statusClasses = {
      [S.PENDING]: "badge-warning",
      [S.ASSIGNED]: "badge-info",
      [S.IN_PROGRESS]: "badge-warning",
      [S.COMPLETED]: "badge-success",
      [S.VERIFIED]: "badge-success",
      [S.CLOSED]: "badge-success",
    };
    const statusLabels = {
      [S.PENDING]: "Pending",
      [S.ASSIGNED]: "Assigned",
      [S.IN_PROGRESS]: "In Progress",
      [S.COMPLETED]: "Completed",
      [S.VERIFIED]: "Verified",
      [S.CLOSED]: "Closed",
    };
    return `<span class="badge ${statusClasses[status] || "badge-info"}">${
      statusLabels[status] || status
    }</span>`;
  },

  getPriorityBadge: (priority) => {
    const classes = { low: "badge-info", medium: "badge-warning", high: "badge-error" };
    return `<span class="badge ${classes[priority] || "badge-info"}">${Utils.capitalize(priority)}</span>`;
  },

  storage: {
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error("Error reading from localStorage:", e);
        return null;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error("Error writing to localStorage:", e);
        return false;
      }
    },
    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error("Error removing from localStorage:", e);
        return false;
      }
    },
  },

  debounce: (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  getUserDisplayName: (user) => user.name || user.email || "Unknown User",

  getAvatarColor: (name) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"];
    return colors[name.charCodeAt(0) % colors.length];
  },

  hasPermission: (userRole, requiredRole) => {
    const R = window.Constants.USER_ROLES;
    const roleHierarchy = {
      [R.CITIZEN]: 1,
      [R.WORKER]: 2,
      [R.GREEN_CHAMPION]: 2,
      [R.ADMIN]: 3,
      [R.SUPERADMIN]: 4,
    };
    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 99);
  },

  getCurrentLocation: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            latitude: 28.6139 + (Math.random() - 0.5) * 0.1,
            longitude: 77.209 + (Math.random() - 0.5) * 0.1,
          }),
        1000
      )
    ),

  generateMockComplaint: (overrides = {}) => {
    const S = window.Constants.COMPLAINT_STATUS;
    const TYPES = window.Constants.COMPLAINT_TYPES;
    const complaints = [
      "Overflowing dustbin near market",
      "Illegal dumping in vacant lot",
      "Missed garbage collection",
      "Broken waste container",
      "Blocked drainage system",
    ];
    const locations = [
      "Main Street Market",
      "Green Valley Apartments",
      "City Center Plaza",
      "Riverside Park",
      "Industrial Area",
    ];
    return {
      id: "C" + Date.now(),
      title: complaints[Math.floor(Math.random() * complaints.length)],
      description: "Detailed description of the waste management issue",
      location: locations[Math.floor(Math.random() * locations.length)],
      status: S.PENDING,
      priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      submittedBy: "User" + Math.floor(Math.random() * 100),
      submittedAt: new Date(),
      assignedTo: null,
      category: TYPES[Math.floor(Math.random() * TYPES.length)],
      ...overrides,
    };
  },
};

// expose globally
window.Utils = Utils;
