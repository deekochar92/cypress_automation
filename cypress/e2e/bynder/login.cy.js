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

        it.only('SCENARIO: Login with valid credentials' +'\n'+
                    'GIVEN: User is on the login screen' +'\n'+
                    'WHEN: User enters valid credentials' +'\n'+ 
                    'AND: User clicks on submit button' +'\n'+
                    'THEN: User is redirected to DashboardPage', () => {
           loginpage.login(userdata.validUserName,userdata.validPassword)
            cy.url().should('eq', userdata.homePageURL)
        })

        it('Verifies successful logout', () => {
            loginpage.login(userdata.validUserName,userdata.validPassword)
            homepage.logout()
            cy.url().should('eq', userdata.loginPageURL)
        })

        it('Verifies user is directed to captcha page after 4 unsuccesful login attempts', () => {

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

        it('Verifies Unsuccessful login with Invalid credentials', () => {
            
            loginpage.login(faker.internet.email(),faker.internet.password())
            loginpage.verifyErrorText('You have entered an incorrect username or password.')
        })

        it('Verifies Unsuccessful login with Blank Password', () => {
            loginpage.setUserName(userdata.validUserName)
            loginpage.clickSubmit()
            loginpage.verifyErrorText('Please enter your password.')
        })

        it('Verifies Unsuccessful login with Blank UserName', () => {
            loginpage.setPassword(userdata.validPassword)
            loginpage.clickSubmit()
            loginpage.verifyErrorText('Please enter your Username.')
        })

        it('Verifies back button doest not redirect to dashboard', () => {
            loginpage.login(userdata.validUserName,userdata.validPassword)
            homepage.logout()
            cy.go('back')
            cy.url().should('not.eq', userdata.homePageURL)
        })
    })

    context('Localisation Cases', () => {

        it('check local Dutch', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageNL)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextNL) })

        })
        it('check local English', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageEN)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextEN) })

        })

        it('check local French', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageFR)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextFR) })

        })

        it('check local Deutsch', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageDE)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextDE) })

        })

        it('check local Italian', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageIT)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextIT) })

        })

        it('check local Spanish', () => {

            loginpage.clickLanguageBtn()
            loginpage.selectLanguage(loginpage.languageES)
            loginpage.getForgotPassText().then((text) => { expect(text).include(userdata.forgotPassTextES) })

        })

    })

})
