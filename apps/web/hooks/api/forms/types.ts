export type Form = {
    id: string;
    title: string;
    description: string;


    createdAt: string;
    updatedAt: string;
}


export type FormCreateInput = {
    title: string;
    desc: string;
}

export type FormWithFields = {
    title: string;
    description: string;
    fields: {
        id: string;
        title: string;
        label: string;
        type: string;
        placeholder: string;
        required: boolean;
    }[];
}

export type Field = {
    id?:string;
    title: string
    label: string
    placeholder: string
    options?: string[]
    type: string
    required? : boolean
}