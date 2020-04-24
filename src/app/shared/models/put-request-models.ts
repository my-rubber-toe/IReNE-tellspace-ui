/**@package Library of classes that mirror the request body expected by the editor endpoints*/

/**Object that represents the author put request as expected by the server validator*/
export class AuthorPutRequest {
    first_name : string;
    last_name :string;
    email : string;
    faculty : string;

    constructor(  
        first_name : string,
        last_name :string,
        email : string,
        faculty : string){
            this.first_name=first_name;
            this.last_name=last_name;
            this.email=email;
            this.faculty=faculty;
    }
  }
/**Object that represents the author put request as expected by the server validator*/
export class ActorPutRequest {
    first_name : string;
    last_name :string;
    role: string;
    constructor(
        first_name : string,
        last_name : string,
        role: string ){
            this.first_name=first_name;
            this.last_name=last_name;
            this.role=role;
    }
}