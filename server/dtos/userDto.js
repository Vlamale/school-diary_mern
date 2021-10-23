class UserDataDto {
//     this.email;
// this.role;
// this._id;
// this.firstName;
// this.surName;
// this.middleName;
// this.subjectName;
constructor(userData) {
    this.email = userData.email,
        this.role = userData.role,
        this._id = userData._id,
        this.firstName = userData.firstName,
        this.surName = userData.surName,
        this.middleName = userData.middleName,
        this.subjectName = userData.subjectName
}
}

module.exports = {
    UserDataDto
}