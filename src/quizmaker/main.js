const Promise = require("bluebird");
const AppDAO = require("./dao");
const YearRepo = require("./sql_scripts/year");
const SemesterRepo = require("./sql_scripts/semester");
//const ExamRepo = require("./sql_scripts/exam");
const { resolve, reject } = require("bluebird");
//const QuestionRepo = require("./sql_scripts/question");

function main() {
    const dao = new AppDAO("./database.sqlite3")
    const yearRepo = new YearRepo(dao)
    const semesterRepo = new SemesterRepo(dao)
    let yearId

    const yearData = { name: "2022-2023" }

    yearRepo.createTable()
        
        .then(() => semesterRepo.createTable())
        .then(() => yearRepo.create(yearData.name))
        .then((data) => {
            yearId = data.id
            const semesters = [
                {name: "Fall"},
                {name: "Spring"}
            ]
            return Promise.all(semesters.map((semester) => {
                const {name} = semester
                return semesterRepo.create(name)
            }))
        })
        .then(() => yearRepo.getById(yearId))
        .then((year) => {
            console.log(`\nRetrieved year from db`);
            console.log(`year id = ${year.id}`);
            console.log(`year name = ${year.name}`);
            return semesterRepo.getItems(year.id)
        })
        .then((semesters) => {
            console.log(`\nRetrieved semester from db`);
            return new Promise((resolve, reject) => {
                semesters.forEach((semester) => {
                    console.log(`semester id = ${semester.id}`);
                    console.log(`semester name = ${semester.name}`);
                    console.log(`semester yearId = ${semester.yearId}`);
                })
                resolve("success")
            })            
        })
        .catch((err) => {
            console.log("Error: ");
            console.log(JSON.stringify(err));
            console.log(err)
        })
}

main()