export interface Mark {
    bold?: boolean;
    underline?: boolean;
    text: string;
}

export interface Clause {
    title?: string;
    type: string;
    children: AgreementData[];
}

export interface Mention {
    color: string;
    type: string;
    title: string;
    children: AgreementData[];
    id: string;
    value: string;
}

export interface Block {
    title: string;
    type: string;
    children: AgreementData[];
}

export type AgreementData = Clause | Mention | Block | Mark 

