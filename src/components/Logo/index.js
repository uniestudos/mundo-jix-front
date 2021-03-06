import React from 'react'

import styles from './styles.module.sass'

import logoColor from 'assets/logo/logo_color.png'
import logoWhite from 'assets/logo/logo_white.svg'


const Logo = ({ title, desc, color }) => (
    <div className={ styles.logo }>
        <img src={ color === 'white' ? logoWhite : logoColor } alt='Mundo Jix' />
        <p style={{ color: color }}>
            { title }
        </p>
        <span style={{ color: color }}>
            { desc }
        </span>
    </div>
)

export { 
    Logo
}