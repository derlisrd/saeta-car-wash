import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {colors,AvaibleColors} from "../App/colors.js"
import { env } from '../App/config.js';

const ContextTheme = createContext();


const ThemeCustomProvider = ({children})=>{
  
    const localStorageTema = JSON.parse(localStorage.getItem("tema"))
    const [tema,setTema] = useState({
      defaultColor: localStorageTema?.defaultColor || "violet", //referencia a key del objeto
      mode:localStorageTema?.mode || "light",
      colors:localStorageTema?.color || "violet",
      currentColor: localStorageTema?.currentColor || colors["violet"].primary.main, //hace referencia al oclor hexadecimal
      fontSize: {
        general: localStorageTema?.fontSize.general || 14,
        menu: localStorageTema?.fontSize.menu || 15
      }
    })

    const drawerWidth = env.DRAWER_WITH;
    const colorText = tema.mode==='light' ? "#4e4d4d" : "#fff";
    const PaperBgColor = tema.mode==='light' ? "#fff" : "#0d1117";
    const DefaultBgColor = tema.mode==='light' ? "#f9f9f9" : "#161c24";

    const FONT_PRIMARY = 'Montserrat'; // Google Font

    const changeColor = cor =>{
      let json = {...tema,defaultColor:cor,currentColor: colors[cor].primary.main,colors:cor}
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json);
    }

    const changeFont = (font,size)=>{
      let json = {...tema}
      json.fontSize[font] = parseInt(size);
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json);
    }

    

    const changeTheme = ()=>{
      let newMode = tema.mode==="light" ? "dark" : "light";
      let json = {...tema,mode:newMode}
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json)
    }
    

    const theme = createTheme({        
        palette: {
          mode: tema.mode==='light' ? "light" : "dark",
          background:{
            paper:PaperBgColor,
            default:DefaultBgColor,
            blueSky: "#50a7fd"
          },
          primary:{
            light:colors[tema.colors].primary.light,
            main:colors[tema.colors].primary.main,
            dark:colors[tema.colors].primary.dark,
            contrastText:colors[tema.colors].primary.contrastText
          },
          secondary: {
            light: colors[tema.colors].secondary.light,
            main: colors[tema.colors].secondary.main,
            dark: colors[tema.colors].secondary.dark,
            contrastText:colors[tema.colors].secondary.contrastText
          },

          colorText:colorText,
        },
        
        typography: {
          fontSize: parseInt(tema.fontSize.general),
          fontWeightMedium:"bold",
          fontWeightRegular:"500",
          fontFamily:FONT_PRIMARY,
          caption:{
            fontSize:12,
          },
          body1:{
            fontSize:14
          },
          h5:{
            fontWeight:"bold"
          }
          
        },
        components:{
          MuiTableCell:{
            styleOverrides:{
              root:{
                color:colorText,
              }
            }
          },
          MuiBackdrop: {
            styleOverrides: {
              root: {
                
              },
              invisible: {
                background: 'transparent',
              },
            },
          },
          MuiTypography:{
            defaultProps:{
              color:colorText,
            }
          },
          MuiLink: {
            defaultProps: {
              
            },
          },
          MuiCard:{
            styleOverrides:{
              root:{
                borderRadius:"12px",
                boxShadow:"7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)"
              }
            }
          },
          MuiPaper:{
            styleOverrides:{
              root:{
                transition:'all 0.2s',
                backgroundColor:PaperBgColor,
                backgroundImage:"none"
              },
              
            }
          },
          MuiDrawer:{
            styleOverrides:{
              root:{
                
              }
            }
          },
          MuiButton:{
            styleOverrides:{
              root:{
                borderRadius:"8px"
              }
            }
          },
          MuiOutlinedInput:{
            styleOverrides:{
              root:{
                borderRadius:"8px",
                borderWidth:0
              }
            }
          },
          MuiInputBase:{
            styleOverrides:{
              root:{
                border:'none'
              }
            }
          },

          MuiListItemIcon:{
            styleOverrides:{
              root:{
                "& span":{
                  //fontSize:tema.fontSize.menu
                },
            },
          },
        },
        MuiListItemText:{
          styleOverrides:{
            root:{
              "& span":{
                fontSize:tema.fontSize.menu
              },
          },
        },
        },
        MuiListItemButton:{
          styleOverrides:{
            root:{
              "&:hover": {
                borderRadius:"0 18px 18px 0",
              },
            }
          }
        },
        
        MuiListItem:{
            styleOverrides:{
              root:{
                borderRadius:"0 18px 18px 0",
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: tema.mode==="light"? colors[tema.colors].primary.light : colors[tema.colors].primary.main,
                  "& span":{
                    /* fontWeight:"bold", */
                    color:tema.mode==="light"? colors[tema.colors].primary.main : colorText,
                  },
                  borderLeft:`4px solid ${colors[tema.colors].primary.main}`,
                },
                "&:hover": {
                  backgroundColor:colors[tema.colors].primary.light,
                  "& span":{
                    color:tema.mode==="light"? colors[tema.colors].primary.main : colorText,
                    /* fontWeight:"bold", */
                  },
                },
                
            },
          },
        }, 


          MuiCssBaseline:{
            styleOverrides:{
              body: {
                margin:0,
                padding:0,
                boxSizing:"border-box",
                background:DefaultBgColor,
                transition:'all 0.2s',
              },
              
              ".swal-title":{color: colorText+"!important" },
              ".swal-icon--success__hide-corners,.swal-icon--success:after, .swal-icon--success:before":{background:"none !important"},
              ".swal-button":{backgroundColor: colors[tema.colors].primary.main,color:colors[tema.colors].primary.contrastText},
              ".swal-button--cancel":{backgroundColor:colors[tema.colors].secondary.main+"!important"},
              ".swal-text":{color: colorText+"!important" },
              ".swal-button:not([disabled]):hover":{backgroundColor:colors[tema.colors].secondary.dark+"!important",color:colors[tema.colors].secondary.contrastText},
              ".swal-modal":{backgroundColor: PaperBgColor+" !important",border:'1px solid #666'},
              "::-webkit-scrollbar": {width: 0}
            }
          }
        }
      });

      const verifica = ()=>{
        const local = JSON.parse(localStorage.getItem("tema"));
        if(local){
          setTema(local)
        }
        else{
          let json = JSON.stringify({
            defaultColor: "violet",
            mode:"light",
            colors:"violet",
            currentColor: colors["violet"].primary.main,
            fontSize: {
              general: 14,
              menu:15
            }
          })
          localStorage.setItem("tema",json);
        }
      }
      
    
      useEffect(() => {
        verifica();
      }, [])

    return (
        <ContextTheme.Provider value={{changeTheme,drawerWidth,changeColor,AvaibleColors,changeFont,tema}}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
              {children}
          </ThemeProvider>
        </ContextTheme.Provider>
      );
}

export const useTheme = ()=>{
    const {changeTheme,drawerWidth,changeColor,AvaibleColors,changeFont,tema} = useContext(ContextTheme);
    return {changeTheme,drawerWidth,changeColor,AvaibleColors,changeFont,tema}
}

export default ThemeCustomProvider;