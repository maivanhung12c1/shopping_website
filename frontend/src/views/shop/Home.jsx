import { useEffect, useState } from 'react'
import { login } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'
import apiInstance from '../../utils/axios'


export default function Home() {
  return (
    <div>Home</div>
  )
}
