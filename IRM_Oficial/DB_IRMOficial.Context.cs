﻿

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace IRM_Oficial
{

using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;


public partial class DB_IRMOficial : DbContext
{
    public DB_IRMOficial()
        : base("name=DB_IRMOficial")
    {
        this.Configuration.LazyLoadingEnabled = false;
    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        throw new UnintentionalCodeFirstException();
    }


    public virtual DbSet<TB_IDIOMA> TB_IDIOMA { get; set; }

    public virtual DbSet<TB_POST> TB_POST { get; set; }

    public virtual DbSet<TB_TIPO_POST> TB_TIPO_POST { get; set; }

    public virtual DbSet<TB_TIPO_USUARIO> TB_TIPO_USUARIO { get; set; }

    public virtual DbSet<TB_USUARIO> TB_USUARIO { get; set; }

    public virtual DbSet<TB_ACOES_POST> TB_ACOES_POST { get; set; }

    public virtual DbSet<TB_CONTEUDO> TB_CONTEUDO { get; set; }

    public virtual DbSet<TB_USUARIO_LOGIN> TB_USUARIO_LOGIN { get; set; }

    public virtual DbSet<TB_ACOES_CONTEUDO> TB_ACOES_CONTEUDO { get; set; }

    public virtual DbSet<TB_DOCUMENTO> TB_DOCUMENTO { get; set; }

    public virtual DbSet<VW_ACESSOS_HOJE> VW_ACESSOS_HOJE { get; set; }

    public virtual DbSet<VW_ACESSOS_TOTAIS> VW_ACESSOS_TOTAIS { get; set; }

    public virtual DbSet<VW_CURTIDAS_AUDIO> VW_CURTIDAS_AUDIO { get; set; }

    public virtual DbSet<VW_COMPARTILHAMENTOS_AUDIO> VW_COMPARTILHAMENTOS_AUDIO { get; set; }

    public virtual DbSet<VW_PLAYS_AUDIO> VW_PLAYS_AUDIO { get; set; }

    public virtual DbSet<VW_NOVOS_USUARIOS> VW_NOVOS_USUARIOS { get; set; }

    public virtual DbSet<VW_RANK_GERAL> VW_RANK_GERAL { get; set; }

    public virtual DbSet<VW_RANK_MENSAL> VW_RANK_MENSAL { get; set; }

    public virtual DbSet<VW_RANK_SEMANAL> VW_RANK_SEMANAL { get; set; }

    public virtual DbSet<TB_POPUP> TB_POPUP { get; set; }

    public virtual DbSet<VW_ACESSOS_USUARIOS> VW_ACESSOS_USUARIOS { get; set; }

    public virtual DbSet<VW_NUMERO_POSTS> VW_NUMERO_POSTS { get; set; }

}

}

