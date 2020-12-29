# Fullstack

In this repository, you will use Nodes, Express, mySQL and Vue to build a SPA (Single Page Application) for the MVP.

## Project Statement

The overall project is to assist user to monitor the borrowing and lending activities/history between a borrower to a lender or vice-versa. At the same time, the application should promote and instill healthy borrowing habits in the user. For this, project phase, we will work on the borrowing section (refer to MVP)  

## Borrower Definition

FOR individual borrower
WHO wants to monitor the money that they borrowed from other individual.
THE application IS a web-based system
THAT helps the borrower to keep track the amount they borrowed and have control over their borrowing habits
UNLIKE jotting down on paper or some files
THIS APPLICATION keeps the history of the borrowing as well the payment made without the user having problem to remember how much was borrowed or paid.

## MVP

The MVP for the borrowing section will mainly be on the loan creation and listing (borrow data), loan history insertion (paid information) and deletion of the borrow activities. At the same time, there is a summary of the total payment done and current borrowed amount.

## Objectives

- Use API, components (Vue) for the client/frontend and mySQL to build the borrow SPA.
- Pass props to child components and propogate changes back up to parent components.
- Use API to get data from the database mySQL.
- Use state to respond to changes.

## Database Schema

![DB Schema](docs/proj1_db_scheme.PNG)

## Basic Requirements

### 1. Add the borrow page with a form and display the borrowing list on the same page

- [ ] Add functionality.
  - When new borrow activity is added (i.e. clicking on the Submit), the new record should be displayed in the list.
  - Proper form validation should be in place
- [ ] Add styling.
  - The current page the user is on should be orderly.
- [ ] Optional - status threshhold bar
  - The amount borrow should be reflected correctly on the threshold bar to indicate:
  - a. Green: Good. Within healthy borrowing amount ( < 65% )
  - b. Yellow: OK - Be careful ( <= 85% )
  - c. Red: In danger of overborrowing
  - d. Black: Overborrowed. Please reflect!

![Borrow View](docs/borrow_activity_view.png)

### 2. Borrow listing

- [ ] Add functionality.
  - The list should display all the borrowings which is active
  - Each entry should have delete, pay, complete (or done) action.
- [ ] Add styling.
  - Pleasing to the eyes.

### 3. Improve styling

- [ ] Play with the styling so this looks as professional as possible!

## Resources

- [API Routes Design](docs/Bor-Lend_ API Routes Design.docx)
- [Technical Specification](https://xxxx)

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Kuala Lumpur._
