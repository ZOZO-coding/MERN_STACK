import React from 'react'
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { SiGmail } from 'react-icons/si'

const Footer = () => {
    return (
        <div className='footer'>
            <h6>Contact Information: </h6>
            <div>
                <a href="https://github.com/ZOZO-coding/MERN_STACK" target="_blank"><BsGithub /></a>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/yu-zuo-294aa969/" target="_blank"><BsLinkedin /></a>
            </div>
            <div>
                <SiGmail />: zyken9054@gmail.com (Yu Zuo)
            </div>
        </div>
    )
}

export default Footer