import { z } from "zod";

/* Auth & Users */

export const authSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
    current_password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'lastname' | 'email' | 'password' | 'password_confirmation'>;
export type requestConfirmationCodeForm = Pick<Auth, 'email'>;
export type forgotPasswordForm = Pick<Auth, 'email'>;
export type newPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type updateCurrentPassword = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;
export type ConfirmToken = Pick<Auth, 'token'>;

/* User */

export const userSchema = authSchema.pick({
    name: true,
    lastname: true,
    email: true,
}).extend({
    _id: z.string()
});
export type user = z.infer<typeof userSchema>;

/* Team */
const teamMemberSchema = userSchema.pick({
    name: true,
    lastname: true,
    email: true,
    _id: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;

/* Notes */
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

/* Tasks */

export const TaskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema, //userschema
        status: TaskStatusSchema
    })),
    notes: z.array(noteSchema),
    createdAt: z.string(),
    updatedAt: z.string()
});


export const taskProjectSchema = TaskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
    project: true,
    completedBy: true,
    createdAt: true,
    updatedAt: true
}).extend({
    completedBy: z.array(z.object({
        _id: z.string(),
        status: TaskStatusSchema,
        user: z.string()
    })),
    notes: z.array(z.string())
});


export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = z.infer<typeof taskProjectSchema>

/** Profile */
export type UserProfileForm = Pick<user, 'name' | 'lastname' | 'email'>;

/* Projects */

export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick({ _id: true }))),
    createdAt: z.string(userSchema.pick({ _id: true }))
});

export const dashboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
        createdAt: true,
    })
);

export const editProjectSchema = ProjectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type DashboardProject = {
    clientName: string,
    createdAt: string,
    description: string,
    manager: string,
    projectName: string,
    _id: string
};

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;
