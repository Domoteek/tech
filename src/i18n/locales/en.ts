export const en = {
  translation: {
    appName: 'Gest-Mag TechManager',
    nav: {
      dashboard: 'Dashboard',
      machines: {
        title: 'Machines',
        brands: 'Brands',
        models: 'Models'
      },
      software: 'Software',
      documents: 'Documents',
      users: 'Users',
      roles: 'Roles',
      settings: 'Settings',
      profile: 'Profile'
    },
    machines: {
      brands: {
        title: 'Brand Management',
        add: 'Add Brand',
        edit: 'Edit Brand',
        delete: 'Delete Brand',
        deleteConfirm: 'Are you sure you want to delete this brand?',
        noBrands: 'No brands found',
        searchPlaceholder: 'Search for a brand...',
        form: {
          name: 'Brand Name',
          description: 'Description',
          logo: 'Logo URL'
        }
      },
      models: {
        title: 'Model Management',
        add: 'Add Model',
        edit: 'Edit Model',
        delete: 'Delete Model',
        deleteConfirm: 'Are you sure you want to delete this model?',
        noModels: 'No models found',
        searchPlaceholder: 'Search for a model...',
        form: {
          name: 'Model Name',
          description: 'Description',
          image: 'Image URL',
          specifications: 'Technical Specifications'
        }
      }
    },
    software: {
      title: 'Software Management',
      add: 'Add Software',
      searchPlaceholder: 'Search for software...',
      allTypes: 'All Types',
      noSoftware: 'No software found'
    },
    documents: {
      title: 'Document Management',
      add: 'Add Document',
      searchPlaceholder: 'Search for documents...',
      allTypes: 'All Types',
      noDocuments: 'No documents found'
    },
    users: {
      title: 'User Management',
      addUser: 'Add User',
      editUser: 'Edit User',
      searchPlaceholder: 'Search by name or email...',
      allRoles: 'All Roles',
      noUsers: 'No users found',
      table: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        createdAt: 'Created At',
        actions: 'Actions'
      },
      roles: {
        admin: 'Administrator',
        user: 'User',
        commercial: 'Sales',
        technician: 'Technician',
        installer: 'Installer'
      },
      form: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        selectRole: 'Select a role'
      }
    },
    roles: {
      management: {
        title: 'Role Management'
      },
      list: {
        title: 'Role List'
      },
      permissions: {
        title: 'Permissions',
        resource: 'Resource',
        save: 'Save Permissions'
      },
      add: {
        title: 'Add Role',
        button: 'Add Role',
        name: 'Role Name',
        description: 'Description'
      },
      noSelection: 'No role selected',
      selectToEdit: 'Select a role to edit its permissions',
      success: {
        saved: 'Permissions saved successfully',
        added: 'Role added successfully'
      },
      errors: {
        fetchFailed: 'Error loading roles',
        saveFailed: 'Error saving permissions',
        addFailed: 'Error adding role'
      },
      descriptions: {
        admin: 'Full access to all system features',
        user: 'Basic access with read-only permissions',
        commercial: 'Access to view machines, software, and documents',
        technician: 'Manage machines, software, and documents',
        installer: 'View machines, software, and installation documents'
      }
    },
    settings: {
      title: 'Settings',
      appName: {
        title: 'Application Name',
        description: 'Customize your application name',
        save: 'Save',
        cancel: 'Cancel',
        success: 'Application name updated successfully',
        error: 'Error updating application name'
      },
      language: {
        title: 'Language',
        description: 'Select your preferred language',
        fr: 'Français',
        en: 'English'
      },
      theme: {
        title: 'Theme',
        description: 'Customize the application appearance',
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      }
    },
    auth: {
      login: {
        title: 'Login',
        submit: 'Sign in',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        forgotPassword: 'Forgot your password?'
      },
      register: {
        title: 'Create account',
        submit: 'Create account',
        hasAccount: 'Already have an account?',
        signIn: 'Sign in'
      },
      resetPassword: {
        title: 'Reset password',
        submit: 'Send reset link',
        backToLogin: 'Back to login'
      },
      fields: {
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm password',
        fullName: 'Full name'
      },
      errors: {
        invalidEmail: 'Invalid email address',
        passwordLength: 'Password must be at least 6 characters',
        passwordMatch: "Passwords don't match",
        nameLength: 'Name must be at least 2 characters'
      }
    },
    profile: {
      title: 'Profile',
      edit: 'Edit Profile',
      success: 'Profile updated successfully',
      error: 'Error updating profile',
      errors: {
        requiredFields: 'All required fields must be filled'
      }
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      back: 'Back',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Operation successful',
      read: 'Read',
      write: 'Write'
    }
  }
};