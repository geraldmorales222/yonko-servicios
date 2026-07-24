'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { auth, db, googleProvider } from '@/lib/firebase';
import { ProjectAsset, assetKind, assetUrl, slugifyProjectName } from '@/lib/project-assets';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

type AdminSection = 'dashboard' | 'editor' | 'proyectos';

const inputStyle = 'w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-600';

function StatCard({ label, value, hint, tone = 'blue' }: { label: string; value: string | number; hint: string; tone?: 'blue' | 'emerald' | 'slate' | 'amber' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <div className={`rounded-2xl border p-5 ${tones[tone]}`}>
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] opacity-60">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-semibold opacity-70">{hint}</p>
    </div>
  );
}

function Sidebar({
  active,
  setActive,
  unreadCount,
  userEmail,
  onLogout,
}: {
  active: AdminSection;
  setActive: (section: AdminSection) => void;
  unreadCount: number;
  userEmail?: string | null;
  onLogout: () => void;
}) {
  const items: Array<{ id: AdminSection; label: string; desc: string; icon: string }> = [
    { id: 'dashboard', label: 'Panel', desc: 'Resumen general', icon: '⌁' },
    { id: 'editor', label: 'Editor', desc: 'Crear o editar', icon: '+' },
    { id: 'proyectos', label: 'Proyectos', desc: 'Publicación y estado', icon: '▦' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-slate-200 bg-white/90 p-4 backdrop-blur-xl lg:flex lg:flex-col">
      <Link href="/" className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-950 p-2.5 text-white">
        <img src="/icon.png" alt="Yonko" className="h-8 w-8 rounded-2xl bg-white object-contain p-1" />
        <div>
          <p className="text-sm font-black uppercase leading-none tracking-tight">Yonko ERP</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-blue-200">Admin interno</p>
        </div>
      </Link>

      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
              active === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black ${active === item.id ? 'bg-white/15' : 'bg-slate-100'}`}>{item.icon}</span>
            <span>
              <span className="block text-xs font-black uppercase tracking-widest">{item.label}</span>
              <span className={`mt-0.5 block text-[10px] font-semibold ${active === item.id ? 'text-blue-100' : 'text-slate-400'}`}>{item.desc}</span>
            </span>
          </button>
        ))}
      </nav>

      <Link href="/" className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-500 transition hover:border-blue-200 hover:text-blue-600">Ver sitio público</Link>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">Leads</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-black text-slate-900">Bandeja</span>
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-black text-white">{unreadCount}</span>
        </div>
        <Link href="/administracion-yonko-gerald/consultas" className="mt-4 flex w-full justify-center rounded-2xl bg-white py-3 text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm transition hover:bg-blue-600 hover:text-white">
          Abrir consultas
        </Link>
      </div>

      <div className="mt-auto rounded-2xl border border-slate-100 p-3">
        <p className="break-all text-[11px] font-bold text-slate-500">{userEmail}</p>
        <button onClick={onLogout} className="mt-4 w-full rounded-2xl bg-red-50 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 transition hover:bg-red-600 hover:text-white">
          Salir
        </button>
      </div>
    </aside>
  );
}

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [editId, setEditId] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [desafio, setDesafio] = useState('');
  const [solucion, setSolucion] = useState('');
  const [urlProyecto, setUrlProyecto] = useState('');
  const [categoria, setCategoria] = useState('Desarrollo Web');
  const [tecnologias, setTecnologias] = useState('');
  const [coverAsset, setCoverAsset] = useState<ProjectAsset | null>(null);
  const [assets, setAssets] = useState<ProjectAsset[]>([]);

  const verifyAdmin = async (email: string) => {
    try {
      const res = await fetch('/api/auth/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data.isAdmin;
    } catch (error) {
      console.error('Error validando admin:', error);
      return false;
    }
  };

  const fetchData = async () => {
    const q = query(collection(db, 'proyectos'), orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
    setProyectos(querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() })));

    const snapConsultas = await getDocs(query(collection(db, 'consultas')));
    setUnreadCount(snapConsultas.size);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        const isAdmin = await verifyAdmin(currentUser.email);
        if (isAdmin) {
          setUser(currentUser);
          await fetchData();
        } else {
          await signOut(auth);
          alert('Acceso no autorizado.');
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const metrics = useMemo(() => {
    const visibles = proyectos.filter((p) => p.habilitado).length;
    const drive = proyectos.filter((p) => p.coverAsset?.provider === 'drive').length;
    return {
      total: proyectos.length,
      visibles,
      ocultos: proyectos.length - visibles,
      drive,
      pendientesDrive: proyectos.length - drive,
    };
  }, [proyectos]);

  const uploadProjectFile = async (file: File, area: 'portada' | 'archivos') => {
    if (!nombre.trim()) {
      alert('Primero escribe el nombre del proyecto para crear su carpeta en Drive.');
      return null;
    }

    setUploading(true);
    setUploadMessage(`Subiendo ${file.name} a Google Drive...`);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('projectName', nombre);
      form.append('area', area);

      const res = await fetch('/api/drive-upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo subir a Google Drive.');
      setUploadMessage(`Archivo guardado en Drive: ${file.name}`);
      return data as ProjectAsset;
    } catch (error: any) {
      const message = error?.message || 'No se pudo subir el archivo.';
      setUploadMessage(message);
      alert(message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadCover = async (file?: File) => {
    if (!file) return;
    const asset = await uploadProjectFile(file, 'portada');
    if (asset) setCoverAsset(asset);
  };

  const uploadAssets = async (files?: FileList | null) => {
    if (!files?.length) return;
    const uploaded: ProjectAsset[] = [];
    for (const file of Array.from(files)) {
      const asset = await uploadProjectFile(file, 'archivos');
      if (asset) uploaded.push(asset);
    }
    setAssets((prev) => [...prev, ...uploaded]);
  };

  const deleteDriveAsset = async (asset: ProjectAsset | null | undefined) => {
    if (!asset?.id || asset.provider !== 'drive') return;
    try {
      await fetch('/api/drive-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: asset.id }),
      });
    } catch (error) {
      console.warn('No se pudo eliminar archivo de Google Drive:', error);
    }
  };

  const deleteDriveProjectFolder = async (proyecto: any) => {
    const folderId =
      proyecto.driveFolderId ||
      proyecto.coverAsset?.projectFolderId ||
      proyecto.assets?.find((asset: ProjectAsset) => asset?.projectFolderId)?.projectFolderId;

    const body = folderId
      ? { folderId }
      : { projectName: proyecto.nombre, driveFolder: proyecto.driveFolder };

    const res = await fetch('/api/drive-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'No se pudo eliminar la carpeta de Google Drive.');
    }
  };

  const toggleHabilitado = async (p: any) => {
    const nuevoEstado = !p.habilitado;
    await updateDoc(doc(db, 'proyectos', p.id), { habilitado: nuevoEstado });
    setProyectos((prev) => prev.map((item) => item.id === p.id ? { ...item, habilitado: nuevoEstado } : item));
  };

  const resetForm = () => {
    setEditId(null);
    setNombre('');
    setSubtitulo('');
    setDescripcion('');
    setDesafio('');
    setSolucion('');
    setTecnologias('');
    setUrlProyecto('');
    setCategoria('Desarrollo Web');
    setCoverAsset(null);
    setAssets([]);
    setUploadMessage('');
  };

  const handleEdit = (p: any) => {
    setEditId(p.id);
    setNombre(p.nombre || '');
    setSubtitulo(p.subtitulo || '');
    setDescripcion(p.descripcion || '');
    setDesafio(p.desafio || '');
    setSolucion(p.solucion || '');
    setTecnologias(p.tecnologias || '');
    setUrlProyecto(p.urlProyecto || '');
    setCategoria(p.categoria || 'Desarrollo Web');
    setCoverAsset(p.coverAsset?.provider === 'drive' ? p.coverAsset : null);
    setAssets((p.assets || []).filter((asset: ProjectAsset) => asset?.provider === 'drive'));
    setActiveSection('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverAsset) return alert('La portada en Google Drive es obligatoria.');
    setUploading(true);

    const data: any = {
      nombre,
      subtitulo,
      descripcion,
      desafio,
      solucion,
      urlProyecto,
      categoria,
      tecnologias,
      coverAsset,
      assets,
      driveFolderId: coverAsset?.projectFolderId || assets.find((asset) => asset.projectFolderId)?.projectFolderId || null,
      driveFolder: `proyectos/${slugifyProjectName(nombre)}`,
      fecha: serverTimestamp(),
    };

    try {
      if (editId) {
        await updateDoc(doc(db, 'proyectos', editId), data);
        alert('Proyecto actualizado.');
      } else {
        data.habilitado = true;
        await addDoc(collection(db, 'proyectos'), data);
        alert('Proyecto publicado correctamente.');
      }
      resetForm();
      await fetchData();
      setActiveSection('proyectos');
    } catch (error) {
      console.error(error);
      alert('Error al guardar. Revisa la consola.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (proyecto: any) => {
    if (!confirm(`¿Eliminar ${proyecto.nombre}? Se borrará el proyecto y sus archivos de Google Drive.`)) return;

    try {
      try {
        await deleteDriveProjectFolder(proyecto);
      } catch (driveError) {
        console.warn('No se pudo eliminar carpeta completa. Intentando borrar archivos individuales:', driveError);
        await deleteDriveAsset(proyecto.coverAsset);
        await Promise.all((proyecto.assets || []).map((asset: ProjectAsset) => deleteDriveAsset(asset)));
      }
      await deleteDoc(doc(db, 'proyectos', proyecto.id));
      await fetchData();
    } catch (error) {
      console.error('Error en el borrado:', error);
      alert('Error al eliminar. Revisa la consola.');
    }
  };

  const removeAsset = async (indexToRemove: number) => {
    const asset = assets[indexToRemove];
    const nextAssets = assets.filter((_, index) => index !== indexToRemove);
    setAssets(nextAssets);

    if (editId) {
      await updateDoc(doc(db, 'proyectos', editId), { assets: nextAssets });
      await deleteDriveAsset(asset);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-6 text-center">
        <div className="max-w-sm space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
          <img src="/icon.png" alt="Yonko" className="mx-auto h-16 w-16 rounded-3xl border border-slate-100 object-contain p-2" />
          <h1 className="text-3xl font-black uppercase text-slate-900">Acceso restringido</h1>
          <p className="text-slate-500">Inicia sesión con tu cuenta de ingeniería para gestionar Yonko.</p>
          <button onClick={() => signInWithPopup(auth, googleProvider)} className="w-full rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-blue-600">
            Iniciar con Google Admin
          </button>
          <Link href="/" className="block text-xs font-bold uppercase tracking-widest text-slate-400">← Volver al sitio</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Sidebar active={activeSection} setActive={setActiveSection} unreadCount={unreadCount} userEmail={user.email} onLogout={() => signOut(auth)} />

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-3 py-2.5 backdrop-blur-xl lg:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Administración Yonko</p>
              <h1 className="mt-1 text-lg font-black uppercase tracking-tight text-slate-950 md:text-2xl">
                {activeSection === 'dashboard' && 'Panel operativo'}
                {activeSection === 'editor' && (editId ? 'Editar proyecto' : 'Nuevo proyecto')}
                {activeSection === 'proyectos' && 'Gestión de portafolio'}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setActiveSection('editor')} className="rounded-2xl bg-blue-600 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700">
                + Nuevo proyecto
              </button>
              <Link href="/administracion-yonko-gerald/consultas" className="rounded-2xl bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-blue-600">
                Consultas ({unreadCount})
              </Link>
              <Link href="/" className="rounded-xl bg-white px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-blue-600">Ver sitio</Link>
              <button onClick={() => signOut(auth)} className="rounded-2xl bg-red-50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 lg:hidden">
                Salir
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 lg:hidden">
            {(['dashboard', 'editor', 'proyectos'] as AdminSection[]).map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setActiveSection(section)}
                className={`rounded-2xl px-3 py-3 text-[9px] font-black uppercase tracking-widest ${activeSection === section ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                {section === 'dashboard' ? 'Panel' : section === 'editor' ? 'Editor' : 'Proyectos'}
              </button>
            ))}
          </div>
        </header>

        <div className="px-4 py-4 lg:px-6">
          {activeSection === 'dashboard' && (
            <section className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Proyectos" value={metrics.total} hint="Total en Firebase" />
                <StatCard label="Visibles" value={metrics.visibles} hint="Publicados en la web" tone="emerald" />
                <StatCard label="Consultas" value={unreadCount} hint="Leads guardados" tone="amber" />
                <StatCard label="Drive" value={`${metrics.drive}/${metrics.total}`} hint="Assets migrados" tone={metrics.pendientesDrive ? 'amber' : 'slate'} />
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Actividad reciente</p>
                      <h2 className="mt-1 text-lg font-black uppercase tracking-tight">Últimos proyectos</h2>
                    </div>
                    <button onClick={() => setActiveSection('proyectos')} className="text-[10px] font-black uppercase tracking-widest text-blue-600">Ver todos</button>
                  </div>
                  <div className="space-y-3">
                    {proyectos.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                          {assetUrl(p.coverAsset, 200) ? <img src={assetUrl(p.coverAsset, 200)} alt={p.nombre} className="h-full w-full object-cover" /> : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black text-slate-900">{p.nombre}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{p.categoria || 'Sin categoría'}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest ${p.habilitado ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {p.habilitado ? 'Visible' : 'Oculto'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {activeSection === 'editor' && (
            <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-blue-600">Ficha del proyecto</p>
                    <h2 className="mt-1 text-2xl font-black uppercase tracking-tight">{editId ? 'Actualización' : 'Creación'}</h2>
                  </div>
                  {editId && <button type="button" onClick={resetForm} className="rounded-2xl bg-slate-100 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">Cancelar</button>}
                </div>

                <div className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input type="text" placeholder="Nombre del proyecto" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputStyle} required />
                    <input type="text" placeholder="Subtítulo" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className={inputStyle} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputStyle}>
                      <option value="Desarrollo Web">Desarrollo Web</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Apps Móviles">Apps Móviles</option>
                      <option value="Ingeniería de Software">Ingeniería de Software</option>
                      <option value="Automatización">Automatización</option>
                      <option value="Estrategia UX/CX">Estrategia UX/CX</option>
                      <option value="IA & Data Science">IA & Data Science</option>
                    </select>
                    <input type="url" placeholder="URL del proyecto (https://...)" value={urlProyecto} onChange={(e) => setUrlProyecto(e.target.value)} className={inputStyle} />
                  </div>
                  <input type="text" placeholder="Tecnologías (React, Node, Firebase, etc.)" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} className={inputStyle} />
                  <textarea placeholder="Resumen del proyecto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={`${inputStyle} h-28 resize-none`} required />
                  <div className="grid gap-4 md:grid-cols-2">
                    <textarea placeholder="Desafío técnico" value={desafio} onChange={(e) => setDesafio(e.target.value)} className={`${inputStyle} h-36 resize-none`} />
                    <textarea placeholder="Solución aplicada" value={solucion} onChange={(e) => setSolucion(e.target.value)} className={`${inputStyle} h-36 resize-none`} />
                  </div>
                </div>

                <button type="submit" disabled={uploading} className="mt-8 w-full rounded-2xl bg-slate-950 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl transition hover:bg-blue-600 disabled:opacity-50">
                  {uploading ? 'Guardando...' : editId ? 'Actualizar proyecto' : 'Publicar proyecto'}
                </button>
              </form>

              <aside className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="mb-3 ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Portada principal</p>
                  <label className={`block cursor-pointer rounded-2xl border-2 border-dashed px-6 py-7 text-center transition-all ${coverAsset ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-400 hover:border-blue-600'}`}>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadCover(e.target.files?.[0])} />
                    <span className="text-xs font-black uppercase tracking-widest">{coverAsset ? 'Portada lista en Drive' : 'Seleccionar portada'}</span>
                  </label>
                  {coverAsset && <img src={assetUrl(coverAsset, 700)} alt="Portada" className="mt-4 aspect-video w-full rounded-2xl object-cover" />}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="mb-3 ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Archivos Drive</p>
                  <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 px-5 py-5 text-center text-xs font-bold text-slate-400 transition-all hover:border-blue-600">
                    <input type="file" multiple accept="image/*,video/*,.glb,.gltf,.obj,.fbx,.usdz,.zip,.pdf" className="hidden" onChange={(e) => uploadAssets(e.target.files)} />
                    Añadir imágenes, videos o modelos 3D
                  </label>
                  <p className="mt-3 text-[10px] text-slate-400">
                    Carpeta: <span className="font-mono text-blue-600">proyectos/{slugifyProjectName(nombre) || 'nombre-del-proyecto'}</span>
                  </p>
                  {uploadMessage && <p className="mt-3 rounded-2xl bg-slate-50 px-3 py-2.5 text-[10px] font-bold text-slate-500">{uploadMessage}</p>}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {assets.map((asset, index) => {
                      const kind = assetKind(asset);
                      const url = assetUrl(asset, 300);
                      return (
                        <div key={`${url}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                          {kind === 'image' ? <img src={url} alt="Asset" className="aspect-video w-full rounded-xl object-cover" /> : <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-900 text-white"><span className="text-[10px] font-black uppercase tracking-widest">{kind}</span></div>}
                          <button type="button" onClick={() => removeAsset(index)} className="mt-2 w-full rounded-xl bg-red-50 py-2 text-[8px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white">Quitar</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </section>
          )}

          {activeSection === 'proyectos' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-4">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">Portafolio</p>
                  <h2 className="mt-1 text-2xl font-black uppercase tracking-tight">Proyectos publicados</h2>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Drive: {metrics.drive} listos / {metrics.pendientesDrive} pendientes</p>
                </div>
              </div>

              <div className="grid gap-4">
                {proyectos.map((p) => {
                  const coverUrl = assetUrl(p.coverAsset, 200);
                  return (
                    <article key={p.id} className="grid gap-4 rounded-2xl border border-slate-100 p-4 transition hover:border-blue-200 md:grid-cols-[88px_1fr_auto] md:items-center">
                      <div className="h-22 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-20 md:w-20">
                        {coverUrl ? <img src={coverUrl} alt={p.nombre} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center bg-slate-950 text-[8px] font-black uppercase tracking-widest text-white/40">Drive</div>}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-sm font-black text-slate-900">{p.nombre}</h3>
                          <span className={`rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-widest ${p.habilitado ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{p.habilitado ? 'Visible' : 'Oculto'}</span>
                          <span className={`rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-widest ${p.coverAsset?.provider === 'drive' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{p.coverAsset?.provider === 'drive' ? 'Drive' : 'Pendiente Drive'}</span>
                        </div>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">{p.categoria || 'Sin categoría'}</p>
                        <p className="mt-2 line-clamp-1 text-sm text-slate-500">{p.descripcion}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        <button onClick={() => toggleHabilitado(p)} className={`rounded-xl px-3 py-2.5 text-[9px] font-black uppercase tracking-widest ${p.habilitado ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>
                          {p.habilitado ? 'Desactivar' : 'Habilitar'}
                        </button>
                        <button onClick={() => handleEdit(p)} className="rounded-xl bg-slate-950 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-white hover:bg-blue-600">Editar</button>
                        <button onClick={() => handleDelete(p)} className="rounded-xl bg-red-50 px-3 py-2.5 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white">Eliminar</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
