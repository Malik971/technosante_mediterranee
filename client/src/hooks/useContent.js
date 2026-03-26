import { useState, useEffect, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

/**
 * Hook principal de contenu — remplace les imports depuis siteData.js.
 *
 * Usage :
 *   const { data: articles, loading, error } = useContent('articles')
 *   const { data: service } = useContent('services/cabinets')
 *   const { data: page } = useContent('pages/home')
 *
 * @param {string} endpoint   — segment après /api/ (ex: 'articles', 'services/cabinets')
 * @param {object} params     — query params optionnels (ex: { category: 'segur', page: 2 })
 * @param {any}    fallback   — valeur par défaut pendant le chargement
 */
export function useContent(endpoint, params = {}, fallback = null) {
  const [data,    setData]    = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString()

  const url = `${API_BASE}/${endpoint}${query ? `?${query}` : ''}`

  const fetch_ = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => { fetch_() }, [fetch_])

  return { data, loading, error, refetch: fetch_ }
}

/**
 * Hook liste d'articles avec filtres et pagination.
 *
 * const { articles, total, pages, loading } = useArticles({ category: 'segur', page: 1 })
 */
export function useArticles({ category, featured, page = 1, limit = 9 } = {}) {
  const { data, loading, error } = useContent('articles', { category, featured, page, limit })
  return {
    articles: data?.items ?? [],
    total:    data?.total ?? 0,
    pages:    data?.pages ?? 1,
    loading,
    error,
  }
}

/**
 * Hook article unique par slug.
 *
 * const { article, loading } = useArticle('segur-vague-2-ce-qui-change')
 */
export function useArticle(slug) {
  const { data, loading, error } = useContent(`articles/${slug}`)
  return { article: data, loading, error }
}

/**
 * Hook service par slug (avec contenu détail).
 *
 * const { service, loading } = useService('cabinets')
 */
export function useService(slug) {
  const { data, loading, error } = useContent(`services/${slug}`)
  return { service: data, loading, error }
}

/**
 * Hook liste des services.
 *
 * const { services, loading } = useServices()
 */
export function useServices() {
  const { data, loading, error } = useContent('services')
  return { services: data ?? [], loading, error }
}

/**
 * Hook mutations admin (POST / PUT / DELETE).
 * Nécessite un token JWT stocké dans localStorage sous 'tsm_token'.
 *
 * const { mutate, loading, error } = useAdminMutation()
 * await mutate('POST', 'articles', { title: '...', ... })
 * await mutate('PUT', 'articles/42', { published: true })
 * await mutate('DELETE', 'articles/42')
 */
export function useAdminMutation() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const mutate = useCallback(async (method, endpoint, body) => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('tsm_token')
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method,
        headers: {
          'Content-Type':  'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { mutate, loading, error }
}

/**
 * Hook login admin.
 *
 * const { login, loading, error } = useAdminLogin()
 * const { token, user } = await login('admin@technosante.fr', 'monmdp')
 */
export function useAdminLogin() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      localStorage.setItem('tsm_token', data.token)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('tsm_token')
  }, [])

  return { login, logout, loading, error }
}