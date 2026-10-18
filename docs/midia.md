# Fotos, vídeos e legendas pelo GitHub

Não é necessário editar componentes, usar terminal ou instalar um CMS. O fluxo é: **enviar o arquivo → cadastrar um Markdown → publicar em `main`**. O site continua estático.

## Onde colocar cada arquivo

| Conteúdo | Pasta no GitHub |
| --- | --- |
| Fotos e capas dos vídeos (JPG, PNG ou WebP) | `src/assets/fieldnotes/` |
| Vídeos MP4 ou WebM | `public/media/` |
| Legendas sincronizadas WebVTT | `public/media/` |
| Título, ordem e legenda curta de cada registro | `src/content/fieldnotes/` |

Use nomes simples, sem espaços ou acentos, como `estudo-variancia.jpg`. O corpo do Markdown é a legenda que aparece no site. Ele é opcional e aceita links, itálico, negrito e fórmulas.

## Publicar uma foto

1. Abra `src/assets/fieldnotes/` no GitHub e selecione **Add file → Upload files**.
2. Envie a foto e confirme o commit. Apenas enviar a imagem ainda não cria um registro no site.
3. Abra `src/content/fieldnotes/`, selecione **Add file → Create new file** e crie, por exemplo, `estudo-variancia.md`.
4. Use o exemplo abaixo, substituindo o título, o nome do arquivo, a descrição e a legenda pelos seus dados reais.
5. Confirme o commit em `main`. O workflow publica a atualização automaticamente.

```md
---
title: Uma ideia, trabalhada no papel
kind: image
image: ../../assets/fieldnotes/estudo-variancia.jpg
alt: Descreva o que aparece na sua foto, de forma útil para quem não a vê.
order: 1
draft: false
---

Sua legenda curta sobre o registro.
```

`alt` descreve a imagem para acessibilidade; a legenda visível é o texto depois do segundo `---`. Se não quiser legenda, deixe esse corpo vazio. `order` organiza os registros do menor para o maior. A data é opcional: `date: '2026-10-18'` (use a data real do registro).

Também é possível editar o arquivo `first-note.md`, já preparado como rascunho. Ele só aparece no site depois de receber a imagem e de mudar `draft` para `false`. Os exemplos de títulos não são registros publicados.

## Colocar a foto de perfil

1. Envie sua foto para `src/assets/fieldnotes/`, por exemplo `portrait.jpg`.
2. Edite `src/content/fieldnotes/portrait.md`.
3. Ative `image: ../../assets/fieldnotes/portrait.jpg`, ajuste `alt` e mude para `draft: false`.

A foto substitui o monograma ao lado da seção About. **A biografia não é alterada.** Uma legenda opcional pode ser colocada no corpo desse Markdown. Mantenha apenas um retrato publicado com `placement: portrait`. Os demais registros usam a seção Fieldnotes por padrão.

## Publicar um timelapse ou outro vídeo sem áudio significativo

Envie o vídeo para `public/media/`. Uma capa é opcional; para usar uma, envie a imagem para `src/assets/fieldnotes/`.

```md
---
title: Um registro do processo
kind: video
video: /media/meu-timelapse.mp4
poster: ../../assets/fieldnotes/capa-timelapse.jpg
width: 1920
height: 1080
silent: true
order: 2
draft: false
---

Sua legenda curta sobre o que está sendo desenvolvido.
```

Use as dimensões reais do vídeo (por exemplo, `1080` × `1920` para um vídeo vertical). Remova a linha `poster` se não houver capa. `silent: true` indica que não há áudio significativo; o vídeo inicia sem som. Não há reprodução automática, repetição automática ou download antecipado do vídeo: o visitante escolhe reproduzi-lo pelos controles nativos.

## Vídeos explicativos com fala

Além da legenda curta abaixo do vídeo, inclua **legendas sincronizadas** para a fala e os sons relevantes. Envie um arquivo `.vtt` para `public/media/` e use:

```yaml
silent: false
captions: /media/minha-demonstracao-pt.vtt
captionsLanguage: pt
captionsLabel: Português
```

Um arquivo WebVTT começa assim; ajuste os tempos e transcreva o áudio real:

```text
WEBVTT

00:00:00.000 --> 00:00:04.000
Texto correspondente ao primeiro trecho do seu vídeo.

00:00:04.000 --> 00:00:08.000
Texto correspondente ao próximo trecho.
```

O build avisa se um vídeo com áudio não tiver o arquivo de legendas. Há um modelo completo em `docs/fieldnote-video.md`. Para explicações visuais, inclua na legenda ou no texto uma descrição suficiente para compreender a ideia sem depender apenas das imagens. Um link para a publicação original no LinkedIn pode ser colocado no corpo do Markdown, usando a URL real.

## Tamanho dos arquivos e rascunhos

- A interface de upload do GitHub aceita arquivos de até **25 MiB**. Prefira vídeos curtos e comprimidos, abaixo de 20 MB, em MP4/H.264 para boa compatibilidade. Vídeos longos podem ser publicados no LinkedIn e referenciados por um link na legenda de uma foto/capa.
- As fotos são otimizadas por Astro no build. Os vídeos são servidos como enviados; o site não faz transcodificação.
- Um registro com `draft: true` não é renderizado. Isso não torna os arquivos privados: arquivos enviados a um repositório público e a `public/` continuam públicos. Use rascunhos para preparar a apresentação, não para armazenar material privado.
- Para retirar um registro da página, marque `draft: true`. Para retirar também o arquivo público, exclua a mídia e sua referência pelo GitHub.
- Para corrigir uma legenda, basta editar o Markdown correspondente. Não é necessário alterar a homepage.

## Conferir a publicação

Em **Actions**, acompanhe **Deploy portfolio to GitHub Pages**. Um build com falha não substitui o site publicado anteriormente. Verifique o nome dos arquivos e os caminhos mostrados no erro: uma foto publicada precisa de `image` e `alt`; um vídeo precisa de arquivo existente, dimensões e legendas, salvo quando explicitamente silencioso.

Os estilos mantêm a composição editorial em desktop e uma sequência vertical em celulares. A seção funciona sem JavaScript de aplicação, inclusive com controles de vídeo e links diretos para os arquivos.
