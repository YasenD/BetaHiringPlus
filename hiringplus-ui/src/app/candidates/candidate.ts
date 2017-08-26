import { Skill } from './skill';
import { EducationDetail } from './education-detail';
import { Experience } from './experience';
import { Note } from './note';
import { Reminder } from './reminder';
import { Job } from "../jobs/job";

export class Candidate {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  birthday: string;
  resumeUrl?: string;
  experienceDetails: Experience[];
  educationDetails: EducationDetail[];
  skills: Skill[];
  notes: Note[];
  reminder?: Reminder;
  userId: number;
  jobs?: Job[];
}
