import { Person, PersonList } from "@core/interfaces/person.model";
import { CoreApi } from "./core.api";

export class PersonApi {
	private static readonly BASE_URL = 'http://localhost:8080/person';

	public static async getAllPersons(): Promise<PersonList> {
		return await CoreApi.get<PersonList>(PersonApi.BASE_URL) || { content: [] } as PersonList;
	}

	public static async createPerson(person: Person): Promise<Person> {
		return await CoreApi.post<Person>(PersonApi.BASE_URL, person);
	}

	public static async getPersonById(id: number): Promise<Person> {
		return await CoreApi.get<Person>(`${PersonApi.BASE_URL}/${id}`);
	}

	public static async updatePerson(Person: Person): Promise<Person> {
		return await CoreApi.put<Person>(`${PersonApi.BASE_URL}`, Person);
	}

	public static async deletePerson(id: number): Promise<void> {
		await CoreApi.delete(`${PersonApi.BASE_URL}/${id}`);
	}

}
