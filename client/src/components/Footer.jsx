import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterCom = () => {
  return (
    <Footer container className=' border border-t-8 border-teal-500'>
      <div className=" w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
          <div className=" mt-5">
            <Link to="/" className=' self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span className=' px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>My</span>
              Blog
            </Link>
          </div>
          <div className=" grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title='About' />
              <Footer.LinkGroup col >
                <Footer.Link href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer'>
                  100 JS projects
                </Footer.Link>
                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                  my blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Follow me' />
              <Footer.LinkGroup col >
                <Footer.Link href='https://www.github.com' target='_blank' rel='noopener noreferrer'>
                  Github
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col >
                <Footer.Link href='#' >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href='#' >
                  Term &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterCom