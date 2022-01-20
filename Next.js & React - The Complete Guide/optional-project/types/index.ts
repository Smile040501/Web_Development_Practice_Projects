import DocumentType from "./DocumentType";

export interface Meetup extends DocumentType<Meetup> {
    id?: string;
    title: string;
    image: string;
    address: string;
    description: string;
}
