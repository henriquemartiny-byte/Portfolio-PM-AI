@echo off
title Portfolio Dev Server - Henrique Martiny
mode con: cols=90 lines=25
color 0A

echo =========================================================================
echo               PORTFOLIO INTERATIVO - HENRIQUE MARTINY
echo        Iniciando servidor de desenvolvimento local (Next.js v16)...
echo =========================================================================
echo.
echo [1/2] Entrando no diretorio do projeto...
cd /d "%~dp0"

echo [2/2] Executando Next.js Dev Server...
echo.
call npm run dev

if %errorlevel% neq 0 (
    echo.
    color 0C
    echo [ERRO] Ocorreu uma falha ao iniciar o servidor. Verifique se o Node.js esta instalado.
    pause
)
