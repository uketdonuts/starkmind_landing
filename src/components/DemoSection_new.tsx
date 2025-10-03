import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Demo {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  category: { es: string; en: string };
  icon: string;
  gradient: string;
  tech: string[];
  component: React.ComponentType;
}

// Demo Components
const MarketAnalysisDemo: React.FC = () => {
  const { currentLang } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [marketData, setMarketData] = useState([
    { empresa: 'Competidor A', precio: 1299.99, cambio: -2.5, tendencia: 'down' },
    { empresa: 'Competidor B', precio: 1399.99, cambio: +1.2, tendencia: 'up' },
    { empresa: 'Competidor C', precio: 1199.99, cambio: +0.8, tendencia: 'up' },
    { empresa: 'Su Empresa', precio: 1249.99, cambio: 0, tendencia: 'neutral' }
  ]);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const executeAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setMarketData(prev => prev.map(item => {
        if (item.empresa !== 'Su Empresa') {
          const newPrice = item.precio + (Math.random() - 0.5) * 50;
          const newChange = (Math.random() - 0.5) * 5;
          return {
            ...item,
            precio: Math.max(newPrice, 999),
            cambio: newChange,
            tendencia: newChange > 0 ? 'up' : newChange < 0 ? 'down' : 'neutral'
          };
        }
        return item;
      }));
      setLastUpdate(new Date().toLocaleTimeString());
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              {currentLang === 'es' ? 'Control de Análisis' : 'Analysis Control'}
            </h4>
            
            <button 
              onClick={executeAnalysis} 
              disabled={isAnalyzing}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentLang === 'es' ? 'Analizando...' : 'Analyzing...'}
                </span>
              ) : (
                currentLang === 'es' ? 'Ejecutar Análisis' : 'Run Analysis'
              )}
            </button>
            
            <div className="mt-3 text-sm text-slate-600 text-center">
              {currentLang === 'es' ? 'Última actualización: ' : 'Last update: '}
              <span className="font-semibold">{lastUpdate}</span>
            </div>
          </div>
        </div>
        
        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              {currentLang === 'es' ? 'Análisis Competitivo en Tiempo Real' : 'Real-Time Competitive Analysis'}
            </h4>
            <div className="space-y-3">
              {marketData.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                    item.empresa === 'Su Empresa' ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.tendencia === 'up' ? 'bg-green-500' : 
                      item.tendencia === 'down' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="font-medium text-slate-900">{item.empresa}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">${item.precio.toFixed(2)}</div>
                    <div className={`text-sm font-semibold ${
                      item.tendencia === 'up' ? 'text-green-600' : 
                      item.tendencia === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {item.cambio > 0 ? '+' : ''}{item.cambio.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExecutiveDashboardDemo: React.FC = () => {
  const { currentLang } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [kpis, setKpis] = useState({
    revenue: 2840000,
    growth: 23.5,
    customers: 1247,
    efficiency: 94.2
  });

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setKpis(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100000) - 50000,
        growth: Math.max(0, prev.growth + (Math.random() - 0.5) * 2),
        customers: Math.max(0, prev.customers + Math.floor(Math.random() * 20) - 10),
        efficiency: Math.min(100, Math.max(0, prev.efficiency + (Math.random() - 0.5) * 1))
      }));
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Revenue KPI */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">${(kpis.revenue / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-slate-600">{currentLang === 'es' ? 'Ingresos Totales' : 'Total Revenue'}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            {currentLang === 'es' ? '+12.3% vs mes anterior' : '+12.3% vs previous month'}
          </div>
        </div>

        {/* Growth KPI */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">{kpis.growth.toFixed(1)}%</div>
          <div className="text-sm text-slate-600">{currentLang === 'es' ? 'Crecimiento' : 'Growth'}</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">
            {currentLang === 'es' ? 'Objetivo: 25%' : 'Target: 25%'}
          </div>
        </div>

        {/* Customers KPI */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">{kpis.customers.toLocaleString()}</div>
          <div className="text-sm text-slate-600">{currentLang === 'es' ? 'Clientes Activos' : 'Active Customers'}</div>
          <div className="text-xs text-purple-600 font-semibold mt-1">
            {currentLang === 'es' ? '+8.7% este mes' : '+8.7% this month'}
          </div>
        </div>

        {/* Efficiency KPI */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">{kpis.efficiency.toFixed(1)}%</div>
          <div className="text-sm text-slate-600">{currentLang === 'es' ? 'Eficiencia Operacional' : 'Operational Efficiency'}</div>
          <div className="text-xs text-orange-600 font-semibold mt-1">
            {currentLang === 'es' ? 'Meta: 95%' : 'Goal: 95%'}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex justify-center">
        <button 
          onClick={refreshData} 
          disabled={isRefreshing}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center"
        >
          {isRefreshing ? (
            <>
              <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {currentLang === 'es' ? 'Actualizando...' : 'Updating...'}
            </>
          ) : (
            currentLang === 'es' ? 'Actualizar Métricas' : 'Update Metrics'
          )}
        </button>
      </div>
    </div>
  );
};

const AIProcessingDemo: React.FC = () => {
  const { currentLang } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const sampleTexts = {
    es: "La empresa StarkMind reportó ingresos de $2.5 millones en el Q4 2024, con un crecimiento del 35% comparado al año anterior. El CEO mencionó planes de expansión a Colombia y México.",
    en: "StarkMind company reported revenues of $2.5 million in Q4 2024, with a growth of 35% compared to the previous year. The CEO mentioned expansion plans to Colombia and Mexico."
  };

  const processText = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate AI processing
      const mockResults = {
        entities: [
          { type: 'Company', text: 'StarkMind', confidence: 0.95 },
          { type: 'Money', text: '$2.5 millones', confidence: 0.92 },
          { type: 'Date', text: 'Q4 2024', confidence: 0.88 },
          { type: 'Percentage', text: '35%', confidence: 0.90 },
          { type: 'Location', text: 'Colombia', confidence: 0.85 },
          { type: 'Location', text: 'México', confidence: 0.85 }
        ],
        sentiment: { score: 0.8, label: currentLang === 'es' ? 'Positivo' : 'Positive' },
        summary: currentLang === 'es' 
          ? 'Reporte financiero positivo de StarkMind con crecimiento significativo y planes de expansión.'
          : 'Positive financial report from StarkMind with significant growth and expansion plans.'
      };
      setResults(mockResults);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              {currentLang === 'es' ? 'Texto para Análisis' : 'Text for Analysis'}
            </h4>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentLang === 'es' ? 'Ingresa el texto que quieres analizar...' : 'Enter the text you want to analyze...'}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setInputText(sampleTexts[currentLang])}
                className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                {currentLang === 'es' ? 'Usar ejemplo' : 'Use example'}
              </button>
              <button
                onClick={() => setInputText('')}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {currentLang === 'es' ? 'Limpiar' : 'Clear'}
              </button>
            </div>
          </div>

          <button
            onClick={processText}
            disabled={!inputText.trim() || isProcessing}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {currentLang === 'es' ? 'Procesando...' : 'Processing...'}
              </span>
            ) : (
              currentLang === 'es' ? 'Analizar con IA' : 'Analyze with AI'
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">
            {currentLang === 'es' ? 'Resultados del Análisis' : 'Analysis Results'}
          </h4>
          
          {results ? (
            <div className="space-y-4">
              {/* Entities */}
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">
                  {currentLang === 'es' ? 'Entidades Detectadas' : 'Detected Entities'}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {results.entities.map((entity: any, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {entity.text} ({entity.type})
                    </span>
                  ))}
                </div>
              </div>

              {/* Sentiment */}
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">
                  {currentLang === 'es' ? 'Análisis de Sentimiento' : 'Sentiment Analysis'}
                </h5>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    results.sentiment.score > 0.6 ? 'bg-green-500' : 
                    results.sentiment.score > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium">{results.sentiment.label}</span>
                  <span className="text-xs text-gray-500">({(results.sentiment.score * 100).toFixed(0)}%)</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">
                  {currentLang === 'es' ? 'Resumen Automático' : 'Automatic Summary'}
                </h5>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {results.summary}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <p>{currentLang === 'es' ? 'Ingresa texto para ver el análisis de IA' : 'Enter text to see AI analysis'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WebScrapingDemo: React.FC = () => {
  const { currentLang } = useLanguage();
  const [url, setUrl] = useState('https://example-ecommerce.com/products');
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [scrapedData, setScrapedData] = useState<any[]>([]);

  const startScraping = () => {
    setIsScrapingActive(true);
    setScrapedData([]);
    
    // Simulate scraping process
    const mockProducts = [
      { id: 1, name: 'Laptop Gaming Pro', price: 1299.99, stock: 15, rating: 4.5 },
      { id: 2, name: 'Mouse Inalámbrico', price: 49.99, stock: 23, rating: 4.2 },
      { id: 3, name: 'Teclado Mecánico', price: 129.99, stock: 8, rating: 4.7 },
      { id: 4, name: 'Monitor 4K', price: 399.99, stock: 12, rating: 4.4 },
      { id: 5, name: 'Audífonos Pro', price: 199.99, stock: 31, rating: 4.6 }
    ];

    // Simulate progressive data loading
    mockProducts.forEach((product, index) => {
      setTimeout(() => {
        setScrapedData(prev => [...prev, product]);
        if (index === mockProducts.length - 1) {
          setTimeout(() => setIsScrapingActive(false), 500);
        }
      }, (index + 1) * 800);
    });
  };

  const stopScraping = () => {
    setIsScrapingActive(false);
  };

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              {currentLang === 'es' ? 'Configuración de Scraping' : 'Scraping Configuration'}
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={startScraping}
                  disabled={isScrapingActive}
                  className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 text-sm"
                >
                  {isScrapingActive ? (
                    currentLang === 'es' ? 'Ejecutando...' : 'Running...'
                  ) : (
                    currentLang === 'es' ? 'Iniciar' : 'Start'
                  )}
                </button>
                
                {isScrapingActive && (
                  <button
                    onClick={stopScraping}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    {currentLang === 'es' ? 'Detener' : 'Stop'}
                  </button>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  isScrapingActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm font-medium">
                  {isScrapingActive 
                    ? (currentLang === 'es' ? 'Recopilando datos...' : 'Collecting data...') 
                    : (currentLang === 'es' ? 'Inactivo' : 'Inactive')
                  }
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {currentLang === 'es' ? 'Productos encontrados: ' : 'Products found: '}{scrapedData.length}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              {currentLang === 'es' ? 'Datos Extraídos' : 'Extracted Data'}
            </h4>
            
            {scrapedData.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {scrapedData.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{product.name}</h5>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          {currentLang === 'es' ? 'Stock: ' : 'Stock: '}{product.stock}
                        </span>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <p>
                  {currentLang === 'es' 
                    ? 'Haz clic en "Iniciar" para comenzar la extracción de datos' 
                    : 'Click "Start" to begin data extraction'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DemoSection: React.FC = () => {
  const { currentLang } = useLanguage();
  const [activeDemo, setActiveDemo] = useState(0);

  const demos: Demo[] = [
    {
      id: 'market-analysis',
      title: {
        es: 'Análisis de Mercado',
        en: 'Market Analysis'
      },
      description: {
        es: 'Monitoreo competitivo automatizado en tiempo real',
        en: 'Real-time automated competitive monitoring'
      },
      category: {
        es: 'Business Intelligence',
        en: 'Business Intelligence'
      },
      icon: '📊',
      gradient: 'from-blue-500 to-blue-700',
      tech: ['Python', 'BeautifulSoup', 'Pandas', 'PostgreSQL'],
      component: MarketAnalysisDemo
    },
    {
      id: 'executive-dashboard',
      title: {
        es: 'Dashboard Ejecutivo',
        en: 'Executive Dashboard'
      },
      description: {
        es: 'Métricas empresariales centralizadas y KPIs',
        en: 'Centralized business metrics and KPIs'
      },
      category: {
        es: 'Analytics',
        en: 'Analytics'
      },
      icon: '📈',
      gradient: 'from-emerald-500 to-emerald-700',
      tech: ['Django', 'React', 'D3.js', 'Redis'],
      component: ExecutiveDashboardDemo
    },
    {
      id: 'ai-processing',
      title: {
        es: 'Procesamiento IA',
        en: 'AI Processing'
      },
      description: {
        es: 'Análisis inteligente de documentos y textos',
        en: 'Intelligent document and text analysis'
      },
      category: {
        es: 'Inteligencia Artificial',
        en: 'Artificial Intelligence'
      },
      icon: '🧠',
      gradient: 'from-purple-500 to-purple-700',
      tech: ['spaCy', 'NLTK', 'FastAPI', 'TensorFlow'],
      component: AIProcessingDemo
    },
    {
      id: 'web-scraping',
      title: {
        es: 'Web Scraping',
        en: 'Web Scraping'
      },
      description: {
        es: 'Extracción automatizada de datos web',
        en: 'Automated web data extraction'
      },
      category: {
        es: 'Automatización',
        en: 'Automation'
      },
      icon: '🔍',
      gradient: 'from-orange-500 to-orange-700',
      tech: ['Scrapy', 'Selenium', 'Airflow', 'MongoDB'],
      component: WebScrapingDemo
    }
  ];

  const currentDemo = demos[activeDemo];
  const DemoComponent = currentDemo.component;

  return (
    <section id="demos" className="py-32 px-6 bg-gradient-to-b from-neutral-50 to-white" aria-labelledby="demos-title">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-sm font-bold rounded-2xl mb-6 shadow-md">
            {currentLang === 'es' ? 'Demos Interactivas' : 'Interactive Demos'}
          </div>
          <h2 id="demos-title" className="text-5xl md:text-7xl font-black text-neutral-900 mb-8 tracking-tight">
            <span>{currentLang === 'es' ? 'Experimenta' : 'Experience'}</span>{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              {currentLang === 'es' ? 'en Vivo' : 'Live'}
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            {currentLang === 'es' 
              ? 'Interactúa con ejemplos reales de nuestras soluciones. Estas demos muestran las capacidades técnicas que implementamos para nuestros clientes.'
              : 'Interact with real examples of our solutions. These demos showcase the technical capabilities we implement for our clients.'
            }
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-200 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {demos.map((demo, index) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(index)}
                className={`relative p-6 rounded-2xl transition-all duration-300 text-center group ${
                  activeDemo === index
                    ? 'bg-slate-900 text-white shadow-lg transform scale-105'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-3xl mb-3 transition-transform group-hover:scale-110">
                  {demo.icon}
                </div>
                <h3 className="font-bold text-sm mb-2">{demo.title[currentLang]}</h3>
                <p className="text-xs opacity-75">{demo.category[currentLang]}</p>

                {/* Active indicator */}
                {activeDemo === index && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full shadow-lg"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {/* Demo Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${currentDemo.gradient} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg`}>
                  {currentDemo.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{currentDemo.title[currentLang]}</h3>
                  <p className="text-slate-600">{currentDemo.description[currentLang]}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentDemo.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="bg-gradient-to-br from-slate-50 to-white">
            <DemoComponent />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-8">
            {currentLang === 'es'
              ? '¿Te interesa una solución personalizada como estas? Hablemos sobre tu proyecto.'
              : 'Interested in a custom solution like these? Let\'s talk about your project.'
            }
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {currentLang === 'es' ? 'Solicitar Consultoría' : 'Request Consultation'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
