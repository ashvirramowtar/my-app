export class Validator {

    public static hasValue<T>(value: T): boolean {
        if (value != null)
            return (value.toString().trim().length > 0);
        else
            return false;
    }

    private static getCleanedLowerCaseText(text: string): string {
        return text.toString().trim().toLowerCase();
    }

    public static isEqualIgnoreCase(text1: string, text2: string): boolean {
        if (this.hasValue(text1) && this.hasValue(text2)) {
            return (this.getCleanedLowerCaseText(text1) == this.getCleanedLowerCaseText(text2))
        }
        else {
            return false;
        }
    }

    public static isEqual(text1: string, text2: string): boolean {
        if (this.hasValue(text1) && this.hasValue(text2)) {
            return (text1.toString() == text2.toString())
        }
        else {
            return false;
        }
    }

}