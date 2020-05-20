import React from 'react'
import { FooterContainer} from './Styled.jsx'
import Logo from './image.jpg'


export default function Footer() {
    return (

        <FooterContainer  className="main-footer">
        <div className="footer-middle">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 mb-3" >
                    <h2 className="company mb-3">Nurhan Accesories</h2>
                        <img src={Logo} className="imgLogo" alt=""/>
                        
                    </div>
                    {/* <div className="col-md-3 col-sm-6">
                        <h4>Lorem ipsum</h4>
                        <ul className="list-unstyled">
                            <li>lorem upsim</li>
                            <li>lorem upsim</li>
                            <li>lorem upsim</li>
                            <li>lorem upsim</li>  
                        </ul>
                    </div> */}
                    <div className="col-md-4 col-sm-6 mb-3">
                        
                        
                       
                    <div className="mb-2 mt-5">
                         <i class="fa fa-map-marker"><span>  123 Main St</span></i>
  
                     </div>
     
                     <div className="mb-2">
                         <i class="fa fa-phone"><span>  +1.555.555.5555</span></i>
                         
                     </div>
     
                     <div>
                         <i class="fa fa-envelope"> <a href="mailto:support@company.com" className="email">  support@company.com</a></i>

                     </div>


                    </div>
                    <div className="col-md-4 col-sm-6 mb-3 text-right">
                        <h2 className="contactMe">Contact Information</h2>
                        <p>Lorem</p>
                        <i class="fab fa-facebook-square social"></i>
                     <i class="fab fa-instagram social"></i>
                     <i class="fab fa-twitter-square social"></i>
                    </div>

                </div>
                {/* footer copy */}
                <div className="footer-bottom">
 
                            <p className="text-xs-center">
                                &copy;{new Date().getFullYear()} Nurhan Accessories - All Rights Reserved
                            </p>
                        
       
                </div>
            </div>
        </div>
        </FooterContainer >

    )
}


