export class ImisUser {

    /**
     * Constructor.
     * @param {number} id
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} memberType
     * @param {string} joinDate
     * @param {string} paidThrough
     * @param {string} companyId
     * @param {string} company
     */
    constructor(id, firstName, lastName, memberType, joinDate, paidThrough, companyId, company) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.memberType = memberType;
        this.joinDate = joinDate;
        this.paidThrough = paidThrough;
        this.companyId = companyId;
        this.company = company;
    }

    get fullName() {
        return [this.firstName, this.lastName]
            .map(i => (i || "").trim())
            .join(" ")
            .trim();
    }

}
