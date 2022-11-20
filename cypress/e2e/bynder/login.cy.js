import { faker } from '@faker-js/faker'
import LoginPage from "../Pages/LoginPage"
import HomePage from "../Pages/HomePage"



describe('Login Test Suite', () => {
    let userdata
    const loginpage = new LoginPage()
    const homepage = new HomePage()
    before(() => {

        cy.fixture('testdata').then((data) => {
            userdata = data
        })

    })
    beforeEach(() => {

        cy.visit(userdata.loginPageURL)

    })

    context('Positive Cases', () => {

        it('SCENARIO: Login with valid credentials' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User enters valid credentials' +'\n'+ 
                'AND: User clicks on submit button' +'\n'+
                'THEN: User is redirected to Dashboard page', () => {
           loginpage.login(userdata.validUserName,userdata.validPassword)
            cy.url().should('eq', userdata.homePageURL)
        })

        it('SCENARIO: Logout from profile dropdown' +'\n'+
                'GIVEN: User is on the Dashboard page' +'\n'+
                'WHEN: User clicks on profile dropdown menu' +'\n'+ 
                'AND: User clicks on logout button' +'\n'+
                'THEN: User is redirected to Login screen', () => {
            loginpage.login(userdata.validUserName,userdata.validPassword)
            homepage.logout()
            cy.url().should('eq', userdata.loginPageURL)
        })

        it('SCENARIO: User redirects to captcha verification page' +'\n'+
                'GIVEN: User is on the Login screen' +'\n'+
                'WHEN: User enters non-existing credentials 4 times' +'\n'+ 
                'THEN: User is redirected to captcha verification screen', () => {

            let user = faker.internet.email()
            let pass = faker.internet.password()

            for (let i = 0; i < 4; i++) 
            {
                
            loginpage.login(user,pass)

            }
            cy.url().should('eq', userdata.capthcaPageURL)
        })
    })

    context('Negative cases', () => {

        it('SCENARIO: Login with invalid credentials' +'\n'+
                'GIVEN: User is on the Login screen' +'\n'+
                'WHEN: User enters invalid credentials' +'\n'+ 
                'AND: User clicks on submit button' +'\n'+
                'THEN: User is not able to login' +'\n'+
                'AND: User is shown an error message', () => {
            
            loginpage.login(faker.internet.email(),faker.internet.password())
            loginpage.verifyErrorText('You have entered an incorrect username or password.')
        })

        it('SCENARIO: Login without password ' +'\n'+
                'GIVEN: User is on the Login screen' +'\n'+
                'WHEN: User enters valid username' +'\n'+ 
                'AND: User clicks on submit button' +'\n'+
                'THEN: User is not able to login' +'\n'+
                'AND: User is shown an error message', () => {
            loginpage.setUserName(faker.internet.email())
            loginpage.clickSubmit()
            loginpage.verifyErrorText('Please enter your password.')
        })

        it('SCENARIO: Login without username ' +'\n'+
                'GIVEN: User is on the Login screen' +'\n'+
                'WHEN: User enters valid password' +'\n'+ 
                'AND: User clicks on submit button' +'\n'+
                'THEN: User is not able to login' +'\n'+
                'AND: User is shown an error message', () => {
            loginpage.setPassword(faker.internet.password())
            loginpage.clickSubmit()
            loginpage.verifyErrorText('Please enter your Username.')
        })

        it('SCENARIO: Back button does not redirect to dashboard' +'\n'+
                'GIVEN: User is on the Dashboard page' +'\n'+
                'AND: User logs out' +'\n'+
                'WHEN: User clicks the browser back button' +'\n'+ 
                'THEN: User is redirected back to login screen', () => {
            loginpage.login(userdata.validUserName,userdata.validPassword)
            homepage.logout()
            cy.go('back')
            cy.url().should('not.eq', userdata.homePageURL)
        })
    })

    context('Localisation Cases', () => {


        it('SCENARIO: Text changes to selected language-NL' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User clicks the language button' +'\n'+ 
                'AND: User clicks on Nederlands' +'\n'+ 
                'THEN: Text on login screen changes to NL', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageNL)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextNL) })

        })

        it('SCENARIO: Text changes to selected language-EN' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User clicks the language button' +'\n'+ 
                'AND: User clicks on English' +'\n'+ 
                'THEN: Text on login screen changes to EN', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageEN)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextEN) })

        })

        it('SCENARIO: Text changes to selected language-FR' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User clicks the language button' +'\n'+ 
                'AND: User clicks on Francais' +'\n'+ 
                'THEN: Text on login screen changes to FR', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageFR)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextFR) })

        })

        it('SCENARIO: Text changes to selected language-DE' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User clicks the language button' +'\n'+ 
                'AND: User clicks on Deutsch' +'\n'+ 
                'THEN: Text on login screen changes to DE', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageDE)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextDE) })

        })

        it('SCENARIO: Text changes to selected language-IT' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User clicks the language button' +'\n'+ 
                'AND: User clicks on Italiano' +'\n'+ 
                'THEN: Text on login screen changes to IT', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageIT)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextIT) })

        })

        it('SCENARIO: Text changes to selected language-ES' +'\n'+
                'GIVEN: User is on the login screen' +'\n'+
                'WHEN: User clicks the language button' +'\n'+ 
                'AND: User clicks on Espanol' +'\n'+ 
                'THEN: Text on login screen changes to ES', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageES)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextES) })

        })

    })

})
