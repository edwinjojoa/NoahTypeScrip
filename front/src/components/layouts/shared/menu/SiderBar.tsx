import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import LayersIcon from '@mui/icons-material/Layers';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { useMenuSisStore } from './menu.service/menuSiste.service';
import { MenusSis } from './menu.service/interfaceMenuSis';
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  }), [pathname]);

  return router;
}

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function SideBar(props: any) {
  const { listarMenuSystem } = useMenuSisStore();
  const [menusSis, setMenusSis] = useState<MenusSis[]>([]);
  const [navigation, setNavigation] = useState<Navigation>([]);

  /// Generar el menú dinámico
  const generateNavigation = (menus: MenusSis[]): Navigation => {
    const menuMap = new Map<string, any>();

    //  Inicializar el mapa con los elementos vacíos
    menus.forEach(menu => {
      menuMap.set(menu.id, {
        segment: menu.ruta || `menu-${menu.id}`,
        title: menu.titulo,
        icon: <LayersIcon />, // Puedes mejorar esto según el icono del JSON
        children: []
      });
    });

    //  Asignar los submenús a sus respectivos padres
    const navigation: Navigation = [];
    menus.forEach(menu => {
      if (menu.id_menu) {
        // Es un hijo: buscar su padre y añadirlo a `children`
        const parent = menuMap.get(String(menu.id_menu));
        if (parent) {
          parent.children.push({
            segment: menu.ruta || `submenu-${menu.id}`,
            title: menu.titulo,
            icon: <DescriptionIcon />, // Puedes personalizarlo con `menu.icono`
          });
        }
      } else {
        // Es un menú principal: añadirlo a la navegación
        navigation.push(menuMap.get(menu.id));
      }
    });

    return navigation;
  };

  /// Obtener los datos y actualizar la navegación
  useEffect(() => {
    const refrescarMenusSis = async () => {
      const nuevosMenusSis = await listarMenuSystem();
      setMenusSis(nuevosMenusSis);
      setNavigation(generateNavigation(nuevosMenusSis));
    };

    refrescarMenusSis();
  }, []);

  console.log('Menús cargados:', menusSis);

  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={navigation}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
          <Button  component={Link} to="/preguntas">pregunta</Button>
      <Button  component={Link} to="/opcione/respuestas">OpcionesRespuesta</Button>
      <Button  component={Link} to="/encuestas">encuesta</Button>
            <Grid size={5} />
            <Grid size={12}><Skeleton height={14} /></Grid>
            <Grid size={12}><Skeleton height={14} /></Grid>
            <Grid size={4}><Skeleton height={100} /></Grid>
            <Grid size={8}><Skeleton height={100} /></Grid>
            <Grid size={12}><Skeleton height={150} /></Grid>
            <Grid size={12}><Skeleton height={14} /></Grid>
            <Grid size={3}><Skeleton height={100} /></Grid>
            <Grid size={3}><Skeleton height={100} /></Grid>
            <Grid size={3}><Skeleton height={100} /></Grid>
            <Grid size={3}><Skeleton height={100} /></Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
