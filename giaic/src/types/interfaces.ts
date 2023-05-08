interface IProjects {
  title: string;
  repoLink: string;
  hostedLink?: string;
  description?: string;
}

interface ILanguage {
  name: string;
  level:
    | "basic elementary proficiency"
    | "limited working proficiency"
    | "professional working proficiency"
    | "native or bilingual proficiency";
}
interface IExperience {
  title: string;
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Self-employed"
    | "Freelance"
    | "Contract"
    | "Internship"
    | "Apprenticeship"
    | "Seasonal";
  industry: string;
  companyName: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
}

export interface IApplyForm {
  fullName: string;
  cnic: string;
  phoneNumber: string;
  city: string;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string;
  highestQualification:
    | "Matric / O Levels"
    | "Intermediate / A Levels"
    | "Undergraduate (Bachelor's)"
    | "Graduate (Master's)"
    | "Post-Graduate (PhD)";
  github?: string;
  linkedin?: string;
  discord?: string;

  experiences?: IExperience[];
  programmingLanguages?: string[];
  programmingProjects?: IProjects[];

  languages: ILanguage[];
}

// {
//   fullName: "Shehzad",
//   cnic: "4220144338283478",
//   phoneNumber: "03033111499",
//   city: "karachi",
//   email: "shehzad.dev@pm.me",
//   gender: "male",
//   highestQualification: "Intermediate / A Levels",
//   github: "string",
//   linkedin: "string",
//   discord: "string",
//   experiences: [],
//   programmingLanguages: ["js", "ts"],
//   programmingProjects: [
//     {
//       title: "string",
//       repoLink: "string",
//       hostedLink: "string",
//       description: "string",
//     },
//     {
//       title: "string",
//       repoLink: "string",
//       hostedLink: "string",
//       description: "string",
//     },
//   ],
// }
export interface ILogin {
  fullName: string;
  CNIC: string;
  email: string;
  password: string;
}
