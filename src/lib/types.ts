// Types correspondant à la base de données

// Table directus_roles
export type Role = {
    id: string; // uuid
    name: string;
  };
  
  // Table directus_users
  export type User = {
    id: string; // uuid
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string; // uuid, référence à directus_roles.id
    status: string;
  };
  
  // Table directus_files
  export type File = {
    id: string; // uuid
  };
  
  // Table students
  export type Student = {
    id: string; // uuid
    user_id: string; // uuid, référence à directus_users.id
    slug: string;
    bio: string;
    avatar: string; // uuid, référence à directus_files.id
    date_created: string; // timestamp
    date_updated: string; // timestamp
    user_created: string; // uuid
    user_updated: string; // uuid
  };
  
  // Table projects
  export type Project = {
    id: string; // uuid
    title: string;
    description: string;
    student_id: string; // uuid, référence à students.id
    link: string;
    date_created: string; // timestamp
    date_updated: string; // timestamp
    user_created: string; // uuid
    user_updated: string; // uuid
  };
  
  // Table project_images
  export type ProjectImage = {
    id: string; // uuid
    project_id: string; // uuid, référence à projects.id
    image: string; // uuid, référence à directus_files.id
    order: number;
  };
  
  // Table events
  export type Event = {
    id: string; // uuid
    title: string;
    description: string;
    start_date: string; // timestamp
    end_date: string; // timestamp
    location: string;
    status: string;
    date_created: string; // timestamp
    date_updated: string; // timestamp
    user_created: string; // uuid
    user_updated: string; // uuid
  };
  
  // Table events_admins
  export type EventAdmin = {
    id: string; // uuid
    event_id: string; // uuid, référence à events.id
    admin_id: string; // uuid, référence à directus_users.id
  };
  
  // Table social_networks
  export type SocialNetwork = {
    id: string; // uuid
    platform: string;
    link: string;
    student_id: string; // uuid, référence à students.id
    date_created: string; // timestamp
    date_updated: string; // timestamp
    user_created: string; // uuid
    user_updated: string; // uuid
  };
  
  // Types pour l'API et l'interface utilisateur
  
  // Version simplifiée de Student avec les relations
  export type StudentWithRelations = {
    id: string;
    user_id: string;
    slug: string;
    bio: string;
    avatar?: File;
    first_name: string; // De la table users
    last_name: string; // De la table users
    projects: Project[];
    social_networks: SocialNetwork[];
  };
  
  // Version simplifiée de Project avec les relations
  export type ProjectWithRelations = {
    id: string;
    title: string;
    description: string;
    student_id: string;
    student?: StudentWithRelations;
    link: string;
    images: ProjectImage[];
  };
  
  // Version simplifiée d'Event avec les relations
  export type EventWithRelations = {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    status: string;
    admins: User[];
  };