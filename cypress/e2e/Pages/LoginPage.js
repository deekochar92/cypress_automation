class LoginPage
{
userNameInput='[name="username"]'
passwordInput='[name="password"]'
submitButton='[type="submit"]'
loginErrorMessage='.cbox_messagebox'
languageButton='//a[normalize-space()="Language"]'
languageNL='//a[normalize-space()="Nederlands (Nederland)"]'
languageEN='//a[normalize-space()="English (United States)"]'
languageFR='//a[normalize-space()="Français (France)"]'
languageDE='//a[normalize-space()="Deutsch (Deutschland)"]'
languageIT='//a[normalize-space()="Italiano (Italia)"]'
languageES='//a[normalize-space()="Español (España)"]'
forgotPass='//a[@href="/user/forgotPassword/?redirectToken="]'


setUserName(username)
{
    cy.get(this.userNameInput).type(username)
}

setPassword(password)
{
    cy.get(this.passwordInput).type(password)
}

clickSubmit()
{
    cy.get(this.submitButton).click()
}

login(username,password)
{
    this.setUserName(username)
    this.setPassword(password)
    this.clickSubmit()

}

verifyErrorText(errorMessage)
{
    cy.get(this.loginErrorMessage).should('have.text',errorMessage)
}

clickLanguageBtn()
{
    cy.xpath(this.languageButton).click()
}

selectLanguage(languageOption)
{
    cy.xpath(languageOption).click()
}

getForgotPassText()
{
   let text = cy.xpath(this.forgotPass).invoke('text')
   return text
}
}
export default LoginPage

