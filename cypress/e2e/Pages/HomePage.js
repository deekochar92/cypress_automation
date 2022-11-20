class HomePage
{
    profileButton='.profile'
    logoutButton='form > .action-btn'

clickProfileDropDown()
{
    cy.get(this.profileButton).click()
}

clickLogoutButton()
{
    cy.get(this.logoutButton).click()
}


logout()
{
this.clickProfileDropDown()
this.clickLogoutButton()
}


}

export default HomePage