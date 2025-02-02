export class Utils {
	/**
	 * Formata a data no formato dd/mm/yyyy
	 *
	 * @param date Data no formato yyyy-mm-dd
	 * @returns Data formatada no formato dd/mm/yyyy
	 */
	public static getFormattedDate(date: string) {
		const [year, month, day] = date.split('-');
		return `${day}/${month}/${year}`;
	}

	/**
	 * Converte uma data no formato dd/mm/yyyy para yyyy-mm-dd (ISO 8601)
	 *
	 * @param date Data no formato dd/mm/yyyy
	 * @returns Data no formato yyyy-mm-dd
	 */
	public static getISODate(date: string) {
		const [day, month, year] = date.split('/');
		return `${year}-${month}-${day}`;
	}

	/**
	 * Converte uma data do tipo Date para o formato ISO 8601 (yyyy-mm-dd)
	 *
	 * @param date Data no formato Date
	 * @returns Data no formato yyyy-mm-dd
	 */
	public static getISODateFromDate(date: Date) {
		return date.toISOString().split('T')[0];
	}
}
