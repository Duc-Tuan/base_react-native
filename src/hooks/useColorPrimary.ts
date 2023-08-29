import { useAppSelector } from 'hooks';

export const useColorPrimary = () => {
  const colorPrimary = useAppSelector((state: any) => state?.settings?.colorPrimary);

  // const fetch = () => {
  // };
  // useEffect(() => {
  //     fetch();
  // }, []);

  const results: {
    colorPrimary: string;
  } = {
    colorPrimary,
  };
  return results;
};
