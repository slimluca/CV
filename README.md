# creailcv.it

Foundation for an Italian CV creation and application-preparation product.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Data handling

The CV builder runs in the browser and saves its state to `localStorage`. The
current release has no account system or server-side CV storage. PDF generation
is performed in the browser with jsPDF.
