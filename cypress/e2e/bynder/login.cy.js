import { faker } from '@faker-js/faker'
const userdata = require('../../fixtures/testdata.json')
import LoginPage from "../Pages/LoginPage"
import HomePage from "../Pages/HomePage"



describe('Login Test Suite', () => {
    const loginpage = new LoginPage()
    const homepage = new HomePage()

    beforeEach(() => {

        cy.visit(userdata.loginPageURL)

    })

    context('Positive Cases', () => {

        it('TC-01 Verifies successful login for valid credentials', () => {
           loginpage.login(userdata.validUserName,userdata.validPassword)
            cy.url().should('eq', userdata.homePageURL)
        })

        it('TC-02 Verifies successful logout', () => {
            loginpage.login(userdata.validUserName,userdata.validPassword)
            homepage.logout()
            cy.url().should('eq', userdata.loginPageURL)
        })

        it('TC-03 Verifies successful redirection to captcha page on 4 incorrect login attempts', () => {

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

        it('TC-04 Verifies error message for invalid credentials', () => {
            
            loginpage.login(faker.internet.email(),faker.internet.password())
            loginpage.verifyErrorText('You have entered an incorrect username or password.')
        })

        it('TC-05 Verifies error message for invalid username', () => {
            loginpage.login(faker.internet.email(),userdata.validPassword)
            loginpage.verifyErrorText('You have entered an incorrect username or password.')

        })

        it('TC-06 Verifies error message for invalid password', () => {
            loginpage.login(userdata.validUserName,faker.internet.password())
            loginpage.verifyErrorText('You have entered an incorrect username or password.')

        })

        it('TC-07 Verifies error message for missing password', () => {
            loginpage.setUserName(faker.internet.email())
            loginpage.clickSubmit()
            loginpage.verifyErrorText('Please enter your password.')
        })

        it('TC-08 Verifies error message for missing username', () => {
            loginpage.setPassword(faker.internet.password())
            loginpage.clickSubmit()
            loginpage.verifyErrorText('Please enter your Username.')
        })

        it('TC-09 Verifies browser back button does not redirect to dashboard after logout', () => {
            loginpage.login(userdata.validUserName,userdata.validPassword)
            homepage.logout()
            cy.go('back')
            cy.url().should('not.eq', userdata.homePageURL)
        })
    })

    context('Localisation Cases', () => {

        const Locales =[
            {
                name: 'Nederlands', 
                locator: loginpage.languageNL, 
                value: userdata.forgotPassTextNL
            },

            {
                name:'English' ,
                locator: loginpage.languageEN, 
                value: userdata.forgotPassTextEN
            },

            {
                name:'Francais',
                locator:loginpage.languageFR, 
                value:userdata.forgotPassTextFR
            },

            {
                name:'Deutsch',
                locator:loginpage.languageDE, 
                value:userdata.forgotPassTextDE
            },

            {
                name:'Italiano',
                locator:loginpage.languageIT, 
                value:userdata.forgotPassTextIT
            },

            {
                name:'Espanol',
                locator:loginpage.languageES, 
                value:userdata.forgotPassTextES
            }
        ]

            Locales.forEach(Locale=>{
            it(`TC-10 Verifies text for ${Locale.name} is ${Locale.value} `, () => {

                loginpage.clickLanguageBtn()
                loginpage.selectLanguage(Locale.locator)
                loginpage.getForgotPassText().then((text) => { expect(text).include(Locale.value) })
    
            })
        })
    })

})
