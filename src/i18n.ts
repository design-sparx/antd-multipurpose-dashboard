import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        search: 'Search',
        loading: 'Loading...',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        close: 'Close',
      },
      nav: {
        dashboard: 'Dashboard',
        dashboards: 'Dashboards',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        home: 'Home',
      },
      dashboards: {
        default: 'Default',
        projects: 'Projects',
        ecommerce: 'Ecommerce',
        marketing: 'Marketing',
        social: 'Social',
        bidding: 'Bidding',
        learning: 'Learning',
        logistics: 'Logistics',
      },
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot Password?',
        rememberMe: 'Remember Me',
      },
    },
  },
  es: {
    translation: {
      common: {
        search: 'Buscar',
        loading: 'Cargando...',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        add: 'Agregar',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
        submit: 'Enviar',
        close: 'Cerrar',
      },
      nav: {
        dashboard: 'Panel',
        dashboards: 'Paneles',
        profile: 'Perfil',
        settings: 'Configuración',
        logout: 'Cerrar Sesión',
        home: 'Inicio',
      },
      dashboards: {
        default: 'Predeterminado',
        projects: 'Proyectos',
        ecommerce: 'Comercio',
        marketing: 'Marketing',
        social: 'Social',
        bidding: 'Subastas',
        learning: 'Aprendizaje',
        logistics: 'Logística',
      },
      auth: {
        signIn: 'Iniciar Sesión',
        signUp: 'Registrarse',
        signOut: 'Cerrar Sesión',
        email: 'Correo',
        password: 'Contraseña',
        forgotPassword: '¿Olvidaste tu Contraseña?',
        rememberMe: 'Recordarme',
      },
    },
  },
  fr: {
    translation: {
      common: {
        search: 'Rechercher',
        loading: 'Chargement...',
        save: 'Enregistrer',
        cancel: 'Annuler',
        delete: 'Supprimer',
        edit: 'Modifier',
        add: 'Ajouter',
        back: 'Retour',
        next: 'Suivant',
        previous: 'Précédent',
        submit: 'Soumettre',
        close: 'Fermer',
      },
      nav: {
        dashboard: 'Tableau de bord',
        dashboards: 'Tableaux de bord',
        profile: 'Profil',
        settings: 'Paramètres',
        logout: 'Déconnexion',
        home: 'Accueil',
      },
      dashboards: {
        default: 'Par défaut',
        projects: 'Projets',
        ecommerce: 'E-commerce',
        marketing: 'Marketing',
        social: 'Social',
        bidding: 'Enchères',
        learning: 'Apprentissage',
        logistics: 'Logistique',
      },
      auth: {
        signIn: 'Connexion',
        signUp: 'Inscription',
        signOut: 'Déconnexion',
        email: 'E-mail',
        password: 'Mot de passe',
        forgotPassword: 'Mot de passe oublié?',
        rememberMe: 'Se souvenir de moi',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
