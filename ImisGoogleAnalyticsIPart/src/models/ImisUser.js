export class ImisUser {

    /**
     * Constructor.
     * @param {number} id
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} memberType
     */
    constructor(id, firstName, lastName, memberType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.memberType = memberType;
    }

    get fullName() {
        return [this.firstName, this.lastName]
            .map(i => (i || "").trim())
            .join(" ");
    }

}