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
}
