import React from 'react'
import VentasMain from './VentasMain'
import VentasProvider from './VentasProvider'
import VentasUnder from './VentasUnder'

const Ventas = () => {
  return (
    <VentasProvider>
      <VentasUnder />
      <VentasMain />
    </VentasProvider>
  )
}

export default Ventas
