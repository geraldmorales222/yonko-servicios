'use client';
import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '@/lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
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

  // ─── Lógica de Validación de Seguridad ───
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

  const fetchProyectos = async () => {
    try {
      const q = query(collection(db, 'proyectos'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      setProyectos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.error("Error Proyectos:", error); }
  };

  const fetchUnreadCount = async () => {
    try {
      const q = query(collection(db, 'consultas'));
      const snap = await getDocs(q);
      setUnreadCount(snap.size);
    } catch (error) { console.error("Error Count:", error); }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser && currentUser.email) {
        // Le preguntamos al servidor si este email es el admin
        const isAdmin = await verifyAdmin(currentUser.email);
        
        if (isAdmin) {
          setUser(currentUser);
          fetchProyectos();
          fetchUnreadCount();
        } else {
          await signOut(auth);
          setUser(null);
          alert("Acceso no autorizado.");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      // Iniciar popup de Google
      await signInWithPopup(auth, googleProvider);
      // La lógica de validación se dispara automáticamente en el useEffect (onAuthStateChanged)
    } catch (error) { 
      console.error("Error en Login:", error); 
    }
  };

  // ─── El resto de tus funciones (handleSubmit, etc) se mantienen igual ───
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgId) return alert('La portada es obligatoria.');
    setUploading(true);
    const data = {
      nombre, subtitulo, descripcion, desafio, solucion, urlProyecto, 
      categoria, tecnologias, cloudinaryId: imgId, galeria,
      fecha: serverTimestamp(),
    };
    try {
      if (editId) {
        await updateDoc(doc(db, 'proyectos', editId), data);
        alert("Actualizado exitosamente.");
      } else {
        await addDoc(collection(db, 'proyectos'), data);
        alert("Publicado exitosamente.");
      }
      resetForm();
      fetchProyectos();
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

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar este proyecto?")) {
      await deleteDoc(doc(db, 'proyectos', id));
      fetchProyectos();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <button onClick={handleLogin} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl">
          Acceso Administrador (Seguro)
        </button>
      </main>
    );
  }

  const inputStyle = "w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 font-medium transition-all";

  return (
    <main className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Yonko Editor</h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold italic underline decoration-blue-500 decoration-2">Verified Admin Account</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/administracion-yonko-gerald/consultas" 
              className="relative flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-200"
            >
              <span>Ver Consultas</span>
              <span className="bg-white text-blue-600 px-2 py-0.5 rounded-md text-[9px]">{unreadCount}</span>
            </Link>

            <button onClick={() => signOut(auth)} className="bg-white text-red-500 font-black text-[10px] px-6 py-4 rounded-2xl border border-red-100 uppercase tracking-widest hover:bg-red-50 transition-all">
              Salir
            </button>
          </div>
        </div>

        {/* --- FORMULARIO --- */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-200 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputStyle} required />
                <input type="text" placeholder="Subtítulo" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className={inputStyle} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={inputStyle}>
                  <option value="Web Engineering">Web Engineering</option>
                  <option value="SaaS Development">SaaS Development</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="E-commerce Pro">E-commerce Pro</option>
                </select>
                <input type="url" placeholder="Deploy URL" value={urlProyecto} onChange={(e) => setUrlProyecto(e.target.value)} className={inputStyle} />
              </div>
              <input type="text" placeholder="Tech Stack" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} className={inputStyle} />
              <textarea placeholder="Resumen" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={`${inputStyle} h-24 resize-none`} required />
              <div className="grid md:grid-cols-2 gap-4">
                <textarea placeholder="Desafío" value={desafio} onChange={(e) => setDesafio(e.target.value)} className={`${inputStyle} h-32 resize-none`} />
                <textarea placeholder="Solución" value={solucion} onChange={(e) => setSolucion(e.target.value)} className={`${inputStyle} h-32 resize-none`} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 space-y-8 shadow-sm">
              <CldUploadWidget uploadPreset="yonko_presets" onSuccess={(res: any) => setImgId(res.info.public_id)}>
                {({ open }) => (
                  <button type="button" onClick={() => open()} className={`w-full py-12 border-2 border-dashed rounded-[2rem] transition-all ${imgId ? 'bg-green-50 border-green-500 text-green-700' : 'border-slate-200 text-slate-400 hover:border-blue-600'}`}>
                    {imgId ? '✅ Portada Cargada' : '🖼️ Subir Portada'}
                  </button>
                )}
              </CldUploadWidget>

              <button type="submit" disabled={uploading} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-xs">
                {uploading ? 'PROCESANDO...' : editId ? 'ACTUALIZAR' : 'PUBLICAR'}
              </button>
              {editId && <button type="button" onClick={resetForm} className="w-full text-slate-400 font-bold text-xs uppercase py-2">Cancelar</button>}
            </div>
          </div>
        </form>

        {/* LISTADO */}
        <h2 className="text-2xl font-black tracking-tight uppercase mb-8 opacity-40 italic">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 relative rounded-2xl overflow-hidden bg-slate-100 flex-none border border-slate-100">
                  <CldImage src={p.cloudinaryId} fill sizes="80px" alt="p" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 leading-tight mb-1 line-clamp-1">{p.nombre}</h3>
                  <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest">{p.categoria}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="flex-1 py-3 bg-slate-100 text-slate-900 font-black text-[10px] rounded-xl uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="px-4 py-3 bg-red-50 text-red-500 font-black text-[10px] rounded-xl uppercase hover:bg-red-600 hover:text-white transition-all">Borrar</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}