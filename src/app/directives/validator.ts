export class Validator {

    public static hasValue<T>(value: T): boolean {
        if (value != null)
            return (value.toString().trim().length > 0);
        else
            return false;
    }

    public static hasItems<T>(items: T[]): boolean {
        if (this.hasValue(items))
            return (items.length > 0);
        else
            return false;
    }

    public static isaNumber(value: string): boolean {
        let number = parseFloat(value);
        return (number.toString() == value);
    }

    public static isaWholeNumber(value: string): boolean {
        let number = parseInt(value);
        return (number.toString() == value);
    }

    public static isNumeric(value: string): boolean {
        for (let i=0; i<value.length; i++) {
            let digit = value.charAt(i);
            if (isNaN(parseInt(digit)))
                return false;
        }
        
        return true;
    }

    public static isNonNumeric(value: string): boolean {
        for (let i=0; i<value.length; i++) {
            let letter = value.charAt(i);
            if (!isNaN(parseInt(letter)))
                return false;
        }
        
        return true;
    }

    public static containsNumber(value: string): boolean {
        for (let i=0; i<value.length; i++) {
            let digit = value.charAt(i);
            if (!isNaN(parseInt(digit)))
                return true;
        }
        
        return false;
    }

    public static isOfSpecificLength(value: string, length: number): boolean {
        return (value.toString().trim().length == length);
    }

    public static isOfMinimumLength(value: string, length: number): boolean {
        return (value.toString().trim().length >= length);
    }

    public static isOfMaximumLength(value: string, length: number): boolean {
        return (value.toString().trim().length <= length);
    }

    public static startsWith(value: string, startCharacter: string): boolean {
        let startCharacterLength = startCharacter.length;
        let prefix = value.substr(0, startCharacterLength);
        return (startCharacter.toUpperCase() == prefix.toUpperCase());
    }

    public static hasUpperCase(value: string): boolean {
        for (let i = 0; i < value.length; i++) {
            let character = value.charAt(i);
            if (this.isAnAlphabet(character) && (character == character.toUpperCase()))
                return true;
        }
        
        return false;
    }

    public static hasLowerCase(value: string): boolean {
        for (let i = 0; i < value.length; i++) {
            let character = value.charAt(i);
            if (this.isAnAlphabet(character) && (character == character.toLowerCase()))
                return true;
        }
        
        return false;
    }

    public static hasSpecialCharacter(value: string): boolean {
        let specialCharacters = ['~','!','@','#','$','%','^','&','*','(',')','_','+','`','-','=','<','>',',','.','?','/',':',';',
            '"','\'','{','}','[',']','|','\\'];
        
        for (let i = 0; i < specialCharacters.length; i++)
            if (this.hasCharacter(value, specialCharacters[i]))
                return true;

        return false;
    }

    public static hasCharacter(value: string, character: string): boolean {
        for (let i = 0; i < value.length; i++)
            if (value.charAt(i) == character)
                return true;
        
        return false;
    }

    public static isAnAlphabet(character: string): boolean {
        let alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        for (let i=0; i<alphabets.length; i++)
            if (character.toLowerCase() == alphabets[i])
                return true;
        
        return false;
    }

    public static hasAnAlphabet(text: string): boolean {
        for (let i=0; i<text.length; i++)
            if (this.isAnAlphabet(text[i]))
                return true;

        return false;
    }

    public static areEqual(value1: string, value2: string): boolean {
        return (value1.trim().toUpperCase() == value2.trim().toUpperCase());
    }

    public static getTextWithoutWhiteSpaces(value: string): string {
        return value !==  undefined ? (value.toString().replace(/\s/g, '')) : '';
    }

    public static isGreaterThanMinimumAmount(value: string, minimumAmount: number): boolean {
        return (parseFloat(value) > minimumAmount);
    }

    public static isLessThanMaximumAmount(value: string, maximumAmount: number): boolean {
        return (parseFloat(value) < maximumAmount);
    }

    public static isGreaterThanOrEqualsToMinimumAmount(value: string, minimumAmount: number): boolean {
        return (parseFloat(value) >= minimumAmount);
    }

    public static isLessThanOrEqualsToMaximumAmount(value: string, maximumAmount: number): boolean {
        return (parseFloat(value) <= maximumAmount);
    }

    public static isOnOrBefore(date: Date, maximumDate: Date): boolean {
        return (date <= maximumDate);
    }

    public static isOnOrAfter(date: Date, minimumDate: Date): boolean {
        return (date >= minimumDate);
    }

    public static isBefore(date: Date, maximumDate: Date): boolean {
        return (date < maximumDate);
    }

    public static isAfter(date: Date, minimumDate: Date): boolean {
        return (date > minimumDate);
    }

    public static isInNgbDateFormat(anyDate: any): boolean {
        return ((anyDate.day != undefined) && (anyDate.month != undefined) && (anyDate.year != undefined));
    }

    public static getCapitalizedFirstLetterText(text: string): string {
        let capitalizedFirstLetterText = "";
        if (this.hasValue(text))
            capitalizedFirstLetterText = text.charAt(0).toUpperCase() + text.slice(1);
        
        return capitalizedFirstLetterText;
    }

    public static getCapitalizedWords(text: string): string {
        if (this.hasValue(text)) {
            return text.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        }
        else {
            return "";
        }
    }

    public static isEmailAddressValid(emailAddress: string): boolean {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(emailAddress);
    }

    public static isDateAtleastSpecificAmountOfYears(date: Date, years: number): boolean {
        let minimumDate = this.getAbsoluteDate(new Date());
        minimumDate.setFullYear(minimumDate.getFullYear() - years);
        let isOnOrBeforeSoManyYears = this.isOnOrBefore(date, minimumDate);
        return isOnOrBeforeSoManyYears;
    }

    public static isDateAtmostSpecificAmountOfYears(date: Date, years: number): boolean {
        let maximumDate = this.getAbsoluteDate(new Date());
        maximumDate.setFullYear(maximumDate.getFullYear() - years);
        let isOnOrAfterSoManyYears = this.isOnOrAfter(date, maximumDate);
        return isOnOrAfterSoManyYears;
    }

    public static getAbsoluteDate(date: Date): Date {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let absoluteDate = new Date(year, month, day);

        return absoluteDate;
    }

    public static isaDateObject(date: Date): boolean {
        return (date.toString().toLowerCase() != "invalid date");
    }

    public static getFloatValue(text: string): number {
        return parseFloat(this.getTextWithoutWhiteSpaces(text));
    }

    public static getTextWithSpaces(text: any) {
        if (this.hasValue(text))
            return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        else
            return "";
    }

    public static getNumber(numberText: string): number {
        let value = 0;

        if (Validator.hasValue(numberText) && Validator.isaNumber(numberText))
            value = this.getFloatValue(numberText);

        return value;
    }

    public static getFriendlyDateText(date: Date): string {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let friendlyText = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return friendlyText;
    }

    private static getDoubleFiguredDigit(value: number): string {
        let digit = value.toString();

        if ((value > 0) && (value < 10))
            digit = "0" + digit;

        return digit;
    }

    public static beginsWith(text: string, startText: string): boolean {
        if (this.hasValue(text)) {
            let validStartText = Validator.hasValue(startText) ? startText : "";
            return (text.toLowerCase().startsWith(validStartText.toLowerCase()));
        }

        return false;
    }

    public static contains(text: string, startText: string): boolean {
        if (this.hasValue(text)) {
            let validStartText = Validator.hasValue(startText) ? startText : "";
            return (text.toLowerCase().includes(validStartText.toLowerCase()));
        }

        return false;
    }

    public static getTextReplacedCommasWithSpace(value: string): string {
        let regexExpression = /\,/gi;
        return value.replace(regexExpression, " ");
    }

    public static getTextReplacedDotsWithSpace(value: string): string {
        let regexExpression = /\./gi;
        return value.replace(regexExpression, " ");
    }

    public static getFormattedCellphoneNumber(cellphoneNumber: string): string {
        let formattedCellphoneNumber = new String(cellphoneNumber);
        const SPACE = " ";

        if (this.hasValue(cellphoneNumber)) {
            if (this.isOfSpecificLength(cellphoneNumber, 10)) {
                let firstSegment = cellphoneNumber.substring(0, 3);
                let secondSegment = cellphoneNumber.substring(3, 6);
                let thirdSegment = cellphoneNumber.substring(6, 10);

                formattedCellphoneNumber = firstSegment + SPACE + secondSegment + SPACE + thirdSegment;
            }
        }

        return formattedCellphoneNumber.toString();
    }

    private static getLowerCaseText(value: string): string {
        return Validator.hasValue(value) ? value.toString().trim().toLowerCase() : "";
    }

    public static isEqual(value1: string, value2: string): boolean {
        return (this.getLowerCaseText(value1) == this.getLowerCaseText(value2));
    }

    public static getTextReplacedDotsWithComma(value: string): string {
        return value.replace(".", ",");
    }
}
