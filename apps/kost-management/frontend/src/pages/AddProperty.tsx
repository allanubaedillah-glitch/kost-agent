import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { OwnerNavbar } from '../components/OwnerNavbar';
import { 
  Building2, MapPin, CreditCard, CheckSquare, 
  ArrowRight, ChevronLeft, Plus, Trash2 
} from 'lucide-react';
import { PropertyGenderType, PropertyRuleCheckbox } from '../types';

export const AddProperty: React.FC = () => {
  const { navigate } = useRouter();
  const { addProperty, setSelectedPropertyId } = useOwnerStore();

  const [name, setName] = useState('');
  const [type, setType] = useState<PropertyGenderType>('campur');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Jakarta Selatan');
  const [district, setDistrict] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80');

  // Facilities
  const standardFacilities = [
    'WiFi Cepat', 'Parkir Mobil', 'Parkir Motor', 
    'Dapur Bersama', 'Security 24 Jam', 'CCTV Monitoring', 
    'Mesin Cuci Bersama', 'Akses Kunci 24 Jam'
  ];
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'WiFi Cepat', 'Parkir Motor', 'Dapur Bersama', 'Security 24 Jam'
  ]);

  // Bank Account
  const [bankName, setBankName] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('8830192811');
  const [accountHolder, setAccountHolder] = useState('Hj. Ratna Sari');

  // Rules Checkboxes (ADR-009)
  const [rules, setRules] = useState<PropertyRuleCheckbox[]>([
    { id: 'rule-ktp', label: 'Wajib KTP / NIK Resmi', isRequired: true },
    { id: 'rule-work', label: 'Bukti Kerja / Kartu Mahasiswa Aktif', isRequired: true },
    { id: 'rule-emer', label: 'Kontak Darurat Keluarga', isRequired: true }
  ]);
  const [rulesNotes, setRulesNotes] = useState('Gerbang ditutup pukul 23.00 WIB untuk keamanan bersama.');

  const toggleFacility = (fac: string) => {
    if (selectedFacilities.includes(fac)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== fac));
    } else {
      setSelectedFacilities([...selectedFacilities, fac]);
    }
  };

  const handleAddCustomRule = () => {
    const label = prompt('Masukkan nama ketentuan tambahan:');
    if (label && label.trim()) {
      setRules([...rules, { id: `rule-custom-${Date.now()}`, label: label.trim(), isRequired: false }]);
    }
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !district) {
      alert('Mohon lengkapi Nama Kos, Alamat Lengkap, dan Kecamatan.');
      return;
    }

    const newProp = await addProperty({
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      type,
      address,
      city,
      district,
      description,
      coverImage,
      images: [coverImage],
      facilities: selectedFacilities,
      rulesNotes,
      rulesCheckboxes: rules,
      bankAccount: {
        bankName,
        accountNumber,
        accountHolder
      }
    });

    setSelectedPropertyId(newProp.id);
    alert(`Properti "${name}" berhasil didaftarkan! Silakan tambahkan kamar dan kelola kemitraan.`);
    navigate(`/properties/${newProp.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <OwnerNavbar />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* BREADCRUMB */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button
            onClick={() => navigate('/properties')}
            className="hover:text-indigo-600 font-semibold flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Properti</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Tambah Properti Kos Baru</h1>
            <p className="text-xs text-slate-500">
              Daftarkan unit kos Anda ke sistem Kost Management. Data ini menjadi Single Source of Truth operasional.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GENERAL INFO */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>1. Informasi Umum Properti</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Properti Kos *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Kost Graha Residence"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenis Kos (Kategori Gender) *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as PropertyGenderType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="campur">Kos Campur (Pria & Wanita)</option>
                    <option value="putra">Khusus Kos Putra</option>
                    <option value="putri">Khusus Kos Putri</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap Properti *
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kota / Kabupaten *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Depok">Depok</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kecamatan *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Contoh: Mampang Prapatan / Coblong"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Kos
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan keunggulan lokasi, aksesibilitas, dan suasana kos..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* FASILITAS BERSAMA */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                2. Fasilitas Umum & Bersama Properti
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {standardFacilities.map((fac) => {
                  const isChecked = selectedFacilities.includes(fac);
                  return (
                    <label
                      key={fac}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 cursor-pointer transition ${
                        isChecked ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFacility(fac)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{fac}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* REKENING PEMBAYARAN LANGSUNG */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>3. Rekening Penerima Pembayaran Sewa Langsung (Direct Payment)</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Penyewa di KostAgent akan mentransfer sewa langsung ke rekening ini tanpa perantara escrow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nama Bank *
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="BCA">BCA (Bank Central Asia)</option>
                    <option value="Mandiri">Bank Mandiri</option>
                    <option value="BNI">Bank BNI</option>
                    <option value="BRI">Bank BRI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nomor Rekening *
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nama Pemilik Rekening *
                  </label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* KETENTUAN KOS DINAMIS (ADR-009) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                  <span>4. Ketentuan Sewa & Persyaratan Calon Penghuni (ADR-009)</span>
                </h2>
                <button
                  type="button"
                  onClick={handleAddCustomRule}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Ketentuan Kustom</span>
                </button>
              </div>

              <div className="space-y-2">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-800">{rule.label}</span>
                      {rule.isRequired && (
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                          Wajib
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRule(rule.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Tambahan Tata Tertib Kos
                </label>
                <textarea
                  rows={2}
                  value={rulesNotes}
                  onChange={(e) => setRulesNotes(e.target.value)}
                  placeholder="Misal: Jam malam, aturan tamu lawan jenis..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-2"
              >
                <span>Simpan & Daftarkan Properti</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
