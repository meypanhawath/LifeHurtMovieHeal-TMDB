
import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('lifeHurtMovieHeal_favorites', []);

  const addFavorite = (item, type) => {
    const favorite = { ...item, media_type: type, addedAt: new Date().toISOString() };
    setFavorites(prev => [...prev, favorite]);
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};