
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
    using System.Collections.Generic;
    
public partial class TB_IDIOMA
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public TB_IDIOMA()
    {

        this.TB_POST = new HashSet<TB_POST>();

    }


    public int ID_IDIOMA { get; set; }

    public string DS_IDIOMA { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<TB_POST> TB_POST { get; set; }

}

}
