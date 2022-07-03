export type TechCategory = {
    category:
    string
    | "Design"
    | "Frontend"
    | "Backend(-ish)"
    | "Database"
    | "Deployment"
    | "Testing"
    | "Languages";
    tech: string[];
};
export type Certification = {
    institution: string;
    date: string;
};
export type MyInfo = {
    education: Certification[]
    techStack: TechCategory[]
}
