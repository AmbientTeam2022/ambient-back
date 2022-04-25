# Ambient (ambient-back)

Backend del proyecto Ambient

## Requisitos

- GIT. [Instalación para Windows](https://git-scm.com/download/win).

- Node. Versión LTS: [16.14.2](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x64.msi).

- Yarn v1. Luego de instalar Node, actívalo en consola de admin:

```bash
corepack enable
yarn set version classic
```

## Instalación

Clona este repositorio, por ejemplo desde una carpeta `/ambient/`:

```bash
git clone https://github.com/AmbientTeam2022/ambient-back.git
```

Entra al nuevo directorio `/ambient/ambient-back/`.

Instala las dependencias de Node usando Yarn:

```bash
yarn
```

Copia el archivo `.env.example` como `.env` en la raíz del proyecto (`ambient-back`). Edita el nuevo archivo con estos valores:

```
PORT=3000
```

## Arranque

### Compilar para desarrollo

Usa este comando para probar la App. Los cambios que guardes se aplicarán automáticamente.

```bash
yarn dev
```

### Compilar para producción

```bash
yarn build
```

### Lintear

```bash
yarn lint
```

### Formatear

```bash
yarn format
```

## Herramientas

Se recomiendan las siguientes extensiones para VSCode. Debería preguntarte si quieres instalarlas.

- ESLint
- Prettier
- EditorConfig for VS Code
- Sass
- GitLens
- TODO Highlight
