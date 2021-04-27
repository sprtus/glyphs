import { useEffect } from 'react'

import { UNICODE_VERSION } from '../../config/unicode'
import { setError, setGlyphs, setLoading } from '../../store/actions'
import { Glyph } from '../../types/glyphs'
import { useDispatch } from './useDispatch'

export const useGlyphsData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchGlyphs = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/unicode/${UNICODE_VERSION}.json`)
        const data: [string, Glyph][] = await response.json()
        dispatch(setGlyphs(new Map(data)))
      } catch (e) {
        dispatch(setError(`Error fetching glyphs: ${e?.message ?? e}`))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchGlyphs()
  }, [])
}
