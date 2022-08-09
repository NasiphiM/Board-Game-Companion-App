import { entity } from "./entity";
import { file } from "./file";
import { status } from "./status";
import { user} from './user'

export interface script{
    _id: string;
    name: string;
    author: user;
    owner: user;
    boardgame: string;
    description: string;
    created: Date;
    release: Date;
    downloads: number;
    lastdownload: Date;
    lastupdate: Date;
    public: boolean;
    export: boolean;
    size: number;
    status: status;
    comments: string[];
    programStructure:entity;
    source: file;
    build: file;
    icon: file;
    __v: number;
}

export const empty:script = {
    _id: "",
    name: "",
    author: {name:"",email:""},
    owner: {name:"",email:""},
    boardgame: "",
    description: "",
    created: new Date(0),
    release: new Date(0),
    downloads: 0,
    lastdownload: new Date(0),
    lastupdate: new Date(0),
    public: false,
    export: false,
    status: {value:0,message:"script has been flagged by the system"},
    size: 0,
    comments: [],
    programStructure: {type:"root",name:"root",endLine:0,endPosition:0,startLine:0,startPosition:0,properties:[],children:[]},
    source: {name:"",location:"",awsKey:""},
    build: {name:"",location:"",awsKey:""},
    icon: {name:"",location:"",awsKey:""},
    __v: 0,
}