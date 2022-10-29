

const footerStyle = {
    padding: '10px 20px',
    fontSize: '1.2rem',
    textAlign:'center',
    backgroundColor: 'var(--default-blk-color)',
    color: 'var(--subtext-color)',
    position:'fixed',
    bottom:0,
    width: '100%',
}

const Footer = () => {
    return <div style={footerStyle}>
        This is sample footer. All Rights Reserved.
    </div>
}

export default Footer