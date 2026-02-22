'use client';
import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '@/lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import Link from 'next/link';

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Estados del Formulario
  const [editId, setEditId] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [desafio, setDesafio] = useState('');
  const [solucion, setSolucion] = useState('');
  const [urlProyecto, setUrlProyecto] = useState(''); 
  const [categoria, setCategoria] = useState('Web Engineering');
  const [tecnologias, setTecnologias] = useState(''); 
  const [imgId, setImgId] = useState('');
  const [galeria, setGaleria] = useState<string[]>([]);

  // ─── Lógica de Seguridad ───
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
      console.error("Error validando admin:", error);
      return false;
    }
  };

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'proyectos'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      setProyectos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const snapConsultas = await getDocs(query(collection(db, 'consultas')));
      setUnreadCount(snapConsultas.size);
    } catch (error) { console.error("Error Fetch:", error); }
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
          alert("Acceso no autorizado.");
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ─── Lógica de Visibilidad (Habilitado/Desactivado) ───
  const toggleHabilitado = async (p: any) => {
    try {
      const nuevoEstado = !p.habilitado;
      await updateDoc(doc(db, 'proyectos', p.id), { habilitado: nuevoEstado });
      setProyectos(prev => prev.map(item => item.id === p.id ? { ...item, habilitado: nuevoEstado } : item));
    } catch (error) { console.error(error); }
  };

  // ─── Lógica de Formulario ───
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgId) return alert('La portada es obligatoria.');
    setUploading(true);

    const data: any = {
      nombre, subtitulo, descripcion, desafio, solucion, urlProyecto, 
      categoria, tecnologias, cloudinaryId: imgId, galeria,
      fecha: serverTimestamp(),
    };

    // Si es nuevo, lo creamos habilitado por defecto
    if (!editId) data.habilitado = true;

    try {
      if (editId) {
        await updateDoc(doc(db, 'proyectos', editId), data);
        alert("Proyecto actualizado en la base de datos.");
      } else {
        await addDoc(collection(db, 'proyectos'), data);
        alert("Proyecto publicado correctamente.");
      }
      resetForm();
      fetchData();
    } catch (error) { console.error(error); }
    finally { setUploading(false); }
  };

  const resetForm = () => {
    setEditId(null);
    setNombre(''); setSubtitulo(''); setDescripcion('');
    setDesafio(''); setSolucion(''); setTecnologias('');
    setUrlProyecto(''); setImgId(''); setGaleria([]);
  };

  const handleEdit = (p: any) => {
    setEditId(p.id);
    setNombre(p.nombre); setSubtitulo(p.subtitulo || '');
    setDescripcion(p.descripcion); setDesafio(p.desafio || '');
    setSolucion(p.solucion || ''); setTecnologias(p.tecnologias || '');
    setUrlProyecto(p.urlProyecto || ''); 
    setImgId(p.cloudinaryId); setGaleria(p.galeria || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (proyecto: any) => {
    if (confirm(`¿Eliminar ${proyecto.nombre}? Se borrarán todas sus imágenes de Cloudinary.`)) {
      try {
        // 1. Borrar portada física
        await deleteFromCloudinary(proyecto.cloudinaryId);

        // 2. Borrar galería física (si existe)
        if (proyecto.galeria && proyecto.galeria.length > 0) {
          // Usamos Promise.all para borrar todas las fotos de la galería en paralelo
          await Promise.all(proyecto.galeria.map((imgId: string) => deleteFromCloudinary(imgId)));
        }

        // 3. Finalmente borrar de Firestore
        await deleteDoc(doc(db, 'proyectos', proyecto.id));
        
        alert("Proyecto e imágenes eliminados correctamente.");
        fetchData();
      } catch (error) {
        console.error("Error en el borrado completo:", error);
        alert("Error al eliminar. Revisa la consola.");
      }
    }
  };
  const deleteFromCloudinary = async (publicId: string) => {
    try {
      await fetch('/api/cloudinary-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId }),
      });
      console.log(`Imagen ${publicId} eliminada de Cloudinary`);
    } catch (error) {
      console.error("No se pudo borrar físicamente de Cloudinary:", error);
    }
  };
  // ─── Quitar foto y actualizar DB inmediatamente ───
  const removeGalleryImage = async (indexToRemove: number) => {
    const imageId = galeria[indexToRemove]; // Obtenemos el ID antes de filtrar
    const nuevaGaleria = galeria.filter((_, index) => index !== indexToRemove);
    
    setGaleria(nuevaGaleria);

    if (editId) {
      await updateDoc(doc(db, 'proyectos', editId), { galeria: nuevaGaleria });
      // BORRADO FÍSICO
      await deleteFromCloudinary(imageId);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  if (!user) return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <button onClick={() => signInWithPopup(auth, googleProvider)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl">Acceso Administrador</button>
    </main>
  );

  const inputStyle = "w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 font-medium transition-all";

  return (
    <main className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Yonko Editor</h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold italic underline decoration-blue-500">Verified Account: {user.email}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/administracion-yonko-gerald/consultas" className="relative flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200">
              <span>Bandeja de Entrada</span>
              <span className="bg-white text-blue-600 px-2 py-0.5 rounded-md text-[9px]">{unreadCount}</span>
            </Link>
            <button onClick={() => signOut(auth)} className="bg-white text-red-500 font-black text-[10px] px-6 py-4 rounded-2xl border border-red-100 uppercase tracking-widest">Salir</button>
          </div>
        </div>

        {/* --- FORMULARIO --- */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-200 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre del Proyecto" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputStyle} required />
                <input type="text" placeholder="Subtítulo" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className={inputStyle} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputStyle}>
                  <option value="Web Engineering">Web Engineering</option>
                  <option value="SaaS Development">SaaS Development</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="E-commerce Pro">E-commerce Pro</option>
                </select>
                <input type="url" placeholder="URL del Proyecto (https://...)" value={urlProyecto} onChange={(e) => setUrlProyecto(e.target.value)} className={inputStyle} />
              </div>
              <input type="text" placeholder="Tecnologías (React, Node, etc.)" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} className={inputStyle} />
              <textarea placeholder="Resumen del Proyecto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={`${inputStyle} h-24 resize-none`} required />
              <div className="grid md:grid-cols-2 gap-4">
                <textarea placeholder="Desafío Técnico" value={desafio} onChange={(e) => setDesafio(e.target.value)} className={`${inputStyle} h-32 resize-none`} />
                <textarea placeholder="Solución Aplicada" value={solucion} onChange={(e) => setSolucion(e.target.value)} className={`${inputStyle} h-32 resize-none`} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 space-y-8 shadow-sm">
              {/* PORTADA */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Portada Principal</p>
                <CldUploadWidget uploadPreset="yonko_presets" onSuccess={(res: any) => setImgId(res.info.public_id)}>
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className={`w-full py-12 border-2 border-dashed rounded-[2rem] transition-all ${imgId ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-slate-200 text-slate-400 hover:border-blue-600'}`}>
                      {imgId ? '✅ Imagen Lista' : '🖼️ Seleccionar Portada'}
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              {/* GALERÍA */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Galería de Vistas (3D)</p>
                <CldUploadWidget uploadPreset="yonko_presets" onSuccess={(res: any) => setGaleria(prev => [...prev, res.info.public_id])}>
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 hover:border-blue-600 transition-all text-xs font-bold">📸 Añadir Fotos</button>
                  )}
                </CldUploadWidget>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {galeria.map((id, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden group border border-slate-100">
                      <CldImage src={id} fill alt="gal" className="object-cover" />
                      <button type="button" onClick={() => removeGalleryImage(index)} className="absolute inset-0 bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[7px] font-black uppercase">Quitar</button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={uploading} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-xs">
                {uploading ? 'Guardando...' : editId ? 'Actualizar Proyecto' : 'Publicar Ahora'}
              </button>
              {editId && <button type="button" onClick={resetForm} className="w-full text-slate-400 font-bold text-xs uppercase py-2">Cancelar Edición</button>}
            </div>
          </div>
        </form>

        {/* LISTADO CON ESTADO ONLINE/OFFLINE */}
        <h2 className="text-2xl font-black tracking-tight uppercase mb-8 opacity-40 italic">Gestión de Portafolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div key={p.id} className={`bg-white p-6 rounded-[2.5rem] border transition-all flex flex-col justify-between ${p.habilitado ? 'border-slate-100 shadow-sm' : 'border-red-100 bg-red-50/10 grayscale shadow-none'}`}>
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 relative rounded-2xl overflow-hidden bg-slate-100 flex-none border border-slate-200">
                  <CldImage src={p.cloudinaryId} fill sizes="80px" alt="p" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 leading-tight mb-1 line-clamp-1">{p.nombre}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.habilitado ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{p.habilitado ? 'Visible en Web' : 'Oculto'}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleHabilitado(p)} className={`flex-1 py-3 font-black text-[9px] rounded-xl uppercase tracking-widest transition-all ${p.habilitado ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>
                  {p.habilitado ? 'Desactivar' : 'Habilitar'}
                </button>
                <button onClick={() => handleEdit(p)} className="flex-1 py-3 bg-slate-900 text-white font-black text-[9px] rounded-xl uppercase tracking-widest hover:bg-blue-600 transition-all">Editar</button>
                <button 
                  onClick={() => handleDelete(p)} // Pasamos 'p' (el objeto) en lugar de 'p.id'
                  className="px-4 py-3 bg-red-50 text-red-500 font-black text-[9px] rounded-xl uppercase hover:bg-red-600 hover:text-white transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}